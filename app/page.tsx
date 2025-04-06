import styles from "./page.module.css";
import { UploadFormAction } from "./upload-form-action";
import { UploadFormApi } from "./upload-form-api";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="">
          <h1>Upload files via Api</h1>
          <UploadFormApi />
        </div>
        <div className="">
          <h1>Upload files via Action</h1>
          <UploadFormAction />
        </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
