import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export interface EstimateData {
  id?: string;
  code: string;
  type: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  postProcessing: string;
  postProcessingPrice: number;
  totalPrice: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerRequest?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  childEstimates?: EstimateData[];
  completed: boolean;
}

export const firestoreService = {
  estimates: {
    async create(data: Omit<EstimateData, "id" | "createdAt" | "updatedAt">) {
      try {
        const docRef = await addDoc(collection(db, "estimates"), {
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          completed: false,
        });
        return docRef.id;
      } catch (error) {
        console.error("Error creating estimate:", error);
        throw error;
      }
    },

    async getAll(completed?: boolean) {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "estimates"), orderBy("createdAt", "desc"))
        );

        console.log(completed);

        if (!!completed) {
          return querySnapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                code: doc.id,
                ...doc.data(),
              } as EstimateData)
          );
        }

        return querySnapshot.docs
          .map(
            (doc) =>
              ({
                id: doc.id,
                code: doc.id,
                ...doc.data(),
              } as EstimateData)
          )
          .filter((item) => !item.completed);
      } catch (error) {
        console.error("Error getting estimates:", error);
        throw error;
      }
    },

    async getByEmail(email: string) {
      try {
        const querySnapshot = await getDocs(
          query(
            collection(db, "estimates"),
            where("customerEmail", "==", email)
          )
        );
        return querySnapshot.docs
          .map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as EstimateData)
          )
          .sort(
            (a, b) =>
              (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)
          );
      } catch (error) {
        console.error("Error getting estimates by email:", error);
        throw error;
      }
    },

    async update(id: string, data: Partial<EstimateData>) {
      try {
        await updateDoc(doc(db, "estimates", id), {
          ...data,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error updating estimate:", error);
        throw error;
      }
    },

    async complete(id: string, data: Partial<EstimateData>) {
      try {
        await updateDoc(doc(db, "estimates", id), {
          ...data,
          completed: true,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error completing estimate:", error);
        throw error;
      }
    },

    async delete(id: string) {
      try {
        await deleteDoc(doc(db, "estimates", id));
      } catch (error) {
        console.error("Error deleting estimate:", error);
        throw error;
      }
    },
  },
};
