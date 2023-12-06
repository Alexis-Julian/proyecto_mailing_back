import {
  getDocs,
  getDoc,
  CollectionReference,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";
export async function extractCollection(
  ref: CollectionReference<DocumentData, DocumentData>
) {
  const snapshot = await getDocs(ref);
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
}

export async function extractDocument(
  ref: DocumentReference<DocumentData | DocumentData>
) {
  const snapshot = await getDoc(ref);
  if (snapshot.exists()) return { id: snapshot.id, ...snapshot.data() };

  return null;
}
