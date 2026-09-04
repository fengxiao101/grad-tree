import { initializeApp, getApps } from 'firebase/app';
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from 'firebase/app-check';
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
} from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

const apiKey     = import.meta.env.VITE_FIREBASE_API_KEY as string | undefined;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined;
const projectId  = import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined;
const appCheckSiteKey = import.meta.env.VITE_RECAPTCHA_ENTERPRISE_SITE_KEY as string | undefined;

export const isFirebaseConfigured = !!(apiKey && authDomain && projectId);

const app = isFirebaseConfigured && !getApps().length
  ? initializeApp({
      apiKey,
      authDomain,
      projectId,
      storageBucket:        import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId:    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId:                import.meta.env.VITE_FIREBASE_APP_ID,
    })
  : getApps()[0] ?? null;

// App Check is intentionally optional so local development and deployments
// without a configured site key continue to work. Enable Firestore enforcement
// only after the production deployment reports verified requests in Firebase.
export const appCheck = app && appCheckSiteKey
  ? initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(appCheckSiteKey),
      isTokenAutoRefreshEnabled: true,
    })
  : null;

export const auth = app ? getAuth(app) : null;
// Keep the Firebase session after the browser is closed. Web Auth defaults to
// local persistence, but setting it explicitly prevents a future configuration
// change from making returning users authenticate again.
export const authPersistenceReady = auth
  ? setPersistence(auth, browserLocalPersistence).catch(() => {
      // Browsers that block persistent storage can still use Firebase Auth for
      // the current session; do not turn that storage limitation into a failed
      // sign-in.
    })
  : Promise.resolve();
// Planner objects contain optional fields (for example committedWay and
// selectedScore) that are represented as `undefined` locally. Firestore does
// not accept undefined values unless explicitly configured to omit them.
export const db = app ? initializeFirestore(app, { ignoreUndefinedProperties: true }) : null;

export const googleProvider = new GoogleAuthProvider();
