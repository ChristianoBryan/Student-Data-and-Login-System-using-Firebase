import { router } from "expo-router";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "../firebaseConfig";
import { checkUser } from "../services/authService";

const getUser = async () => {
  const auth = getAuth();
  return auth.currentUser;
};

type Mahasiswa = {
  id: string;
  nama: string;
  nim: string;
  jurusan: string;
};

export default function MahasiswaScreen() {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [jurusan, setJurusan] = useState("");

  const fetchMahasiswa = async () => {
    const hasilFetchMahasiswa = await getDocs(collection(db, "mahasiswa"));
    const list: Mahasiswa[] = hasilFetchMahasiswa.docs.map(doc => ({
      id: doc.id,
      nama: doc.data().nama,
      nim: doc.data().nim,
      jurusan: doc.data().jurusan,
    }));
    setMahasiswa(list);
  };

  const handleAdd = async () => {
    const loggedIn = await checkUser();
    console.log("Logged in? ->", loggedIn);
    if (!loggedIn){
      alert("Silahkan Login Terlebih Dahulu");
      return;
    }
    if (!nama || !nim || !jurusan){
      alert("Semua Kolom Nama, NIM, dan Jurusan wajib diisi");
      return;
    };
    await addDoc(collection(db, "mahasiswa"), { nama, nim, jurusan });
    setNama(""); setNim(""); setJurusan("");
    fetchMahasiswa();
    alert("Data Mahasiswa Berhasil Ditambahkan");
  };

  useEffect(() => {
  const checkUser = async () => {
    const user = await getUser();
    if (!user) {
      router.replace("/tampilanLogin");
    } else {
      fetchMahasiswa();
    }
  };

  checkUser();
}, []);


  return (
    <View style={styles.containerSemua}>
      <Text
        style={styles.judul}> Daftar Mahasiswa
      </Text>
      <TextInput
        placeholder="Nama"
        value={nama}
        onChangeText={setNama}
        style={{ borderWidth: 1, marginBottom: 20, marginTop: 20, padding: 5, backgroundColor:"white" }}
      />
      <TextInput
        placeholder="NIM"
        value={nim}
        onChangeText={setNim}
        style={{ borderWidth: 1, marginBottom: 20, padding: 5, backgroundColor:"white" }}
      />
      <TextInput
        placeholder="Jurusan"
        value={jurusan}
        onChangeText={setJurusan}
        style={{ borderWidth: 1, marginBottom: 20, padding: 5, backgroundColor:"white" }}
      />
      <Button title="Tambah Mahasiswa" onPress={handleAdd} />

      <FlatList
        style={{flex:1, marginBottom:30}}
        data={mahasiswa}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.kotakList}>
            <Text>Nama: {item.nama}</Text>
            <Text>NIM: {item.nim}</Text>
            <Text>Jurusan: {item.jurusan}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerSemua:{
    flex:1,
    padding: 20,
    backgroundColor: "#baebbaff"
  },

  judul:{
    borderWidth: 1,
    textAlign: "center",
    marginTop: 50,
    padding: 5,
    color:"white",
    fontFamily: "sans-serif-black",
    fontSize: 20,
    backgroundColor:"black",
    borderRadius:10
  },

  kotakList:{
    marginVertical: 5,
    backgroundColor: "#e8e8e8ff",
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5
  }
});