import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "../lib/firebase"

const scoresRef = collection(db, "leaderboard")

// ✅ ADD THIS (OR KEEP IT IF MISSING)
export async function getLeaderboard() {
  const q = query(scoresRef, orderBy("score", "desc"), limit(10))
  const snap = await getDocs(q)
  return snap.docs.map(d => d.data())
}

// ✅ KEEP THIS
export async function saveScore({
  name,
  score,
}: {
  name: string
  score: number
}) {
  const q = query(scoresRef, where("name", "==", name))
  const snap = await getDocs(q)

  if (!snap.empty) {
    const doc = snap.docs[0]
    const existingScore = doc.data().score

    if (score > existingScore) {
      await updateDoc(doc.ref, {
        score,
        updatedAt: serverTimestamp(),
      })
    }
    return
  }

  await addDoc(scoresRef, {
    name,
    score,
    createdAt: serverTimestamp(),
  })
}
