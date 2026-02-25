class FirebaseSync {
    constructor() {
        this.db = null;
        this.auth = null;
        this.user = null;
        this.onAuthChangeCallback = null;
        this.onSyncResult = null;
        this.syncTimeout = null;
        this._cachedToken = null;
        this._pendingGetData = null;
    }

    init() {
        const firebaseConfig = {
            apiKey: "AIzaSyAqT5PQT96lnczlvhScY_i3RCFobaNcYHw",
            authDomain: "pyrex-cee7c.firebaseapp.com",
            projectId: "pyrex-cee7c",
            storageBucket: "pyrex-cee7c.firebasestorage.app",
            messagingSenderId: "123520872894",
            appId: "1:123520872894:web:4c02ba7366e2e4f7e5c9ef"
        };

        firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth();
        this.db = firebase.firestore();

        this.auth.onAuthStateChanged((user) => {
            this.user = user;
            if (user) {
                user.getIdToken().then(t => { this._cachedToken = t; }).catch(e => { console.warn('Token refresh failed:', e); });
            } else {
                this._cachedToken = null;
            }
            if (this.onAuthChangeCallback) {
                this.onAuthChangeCallback(user);
            }
        });
    }

    onAuthChange(callback) {
        this.onAuthChangeCallback = callback;
    }

    async signIn() {
        const provider = new firebase.auth.GithubAuthProvider();
        try {
            await this.auth.signInWithPopup(provider);
        } catch (error) {
            console.error('Sign in failed:', error);
            throw error;
        }
    }

    async signOut() {
        try {
            await this.auth.signOut();
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    }

    isSignedIn() {
        return this.user !== null;
    }

    getUserName() {
        return this.user ? this.user.displayName || this.user.email || 'User' : null;
    }

    async saveToCloud(data) {
        if (!this.user) return false;
        try {
            await this.db.collection('users').doc(this.user.uid).set(data, { merge: true });
            return true;
        } catch (error) {
            console.error('Cloud save failed:', error);
            return false;
        }
    }

    async loadFromCloud() {
        if (!this.user) return null;
        try {
            const doc = await this.db.collection('users').doc(this.user.uid).get();
            return doc.exists ? doc.data() : null;
        } catch (error) {
            console.error('Cloud load failed:', error);
            return null;
        }
    }

    async deleteAllData() {
        if (!this.user) return;
        try {
            await this.db.collection('users').doc(this.user.uid).delete();
        } catch (error) {
            console.error('Cloud delete failed:', error);
        }
    }

    scheduleSave(getDataFn) {
        if (!this.user) return;
        this._pendingGetData = getDataFn;
        if (this.syncTimeout) clearTimeout(this.syncTimeout);
        this.syncTimeout = setTimeout(async () => {
            this.syncTimeout = null;
            this._pendingGetData = null;
            const ok = await this.saveToCloud(getDataFn());
            if (this.user) {
                this.user.getIdToken().then(t => { this._cachedToken = t; }).catch(e => { console.warn('Token refresh failed:', e); });
            }
            if (this.onSyncResult) this.onSyncResult(ok);
        }, 2000);
    }

    flushPendingSync() {
        if (!this.syncTimeout || !this._pendingGetData) return;
        clearTimeout(this.syncTimeout);
        this.syncTimeout = null;
        const data = this._pendingGetData();
        this._pendingGetData = null;

        if (this.user && this.db && this._cachedToken) {
            const projectId = this.db.app.options.projectId;
            const uid = this.user.uid;
            const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${uid}?updateMask.fieldPaths=progress`;
            const fields = { progress: this._toFirestoreValue(data.progress) };
            fetch(url, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${this._cachedToken}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ fields }),
                keepalive: true
            }).catch(e => { console.warn('Flush sync failed:', e); });
        }
    }

    _toFirestoreValue(value) {
        if (value === null || value === undefined) return { nullValue: null };
        if (typeof value === 'string') return { stringValue: value };
        if (typeof value === 'number') {
            if (!isFinite(value)) return { nullValue: null };
            return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
        }
        if (typeof value === 'boolean') return { booleanValue: value };
        if (Array.isArray(value)) return { arrayValue: { values: value.map(v => this._toFirestoreValue(v)) } };
        if (typeof value === 'object') {
            const fields = {};
            for (const [k, v] of Object.entries(value)) {
                fields[k] = this._toFirestoreValue(v);
            }
            return { mapValue: { fields } };
        }
        return { stringValue: String(value) };
    }
}
