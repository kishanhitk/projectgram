import firebase from "firebase/app";
import "firebase/storage";
import { useState, useEffect } from "react";

const useStorage = (file) => {
  const [progress, setprogress] = useState(0);
  const [url, seturl] = useState(null);
  const [error, seterror] = useState(null);
  useEffect(() => {
    if (file != null) {
      //! Don't use filename as it is not unique
      const storageRef = firebase.storage().ref(file.name);
      storageRef.put(file).on(
        "state-changed",
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setprogress(percentage);
        },
        (err) => {
          seterror(err);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          seturl(url);
        }
      );
    }
  }, [file]);

  return { progress, url, error };
};
export default useStorage;
