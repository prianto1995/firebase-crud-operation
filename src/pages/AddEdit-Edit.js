import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import fireDb from "../firebase";
import { toast } from "react-toastify";

const initialState = {
    name: "",
    email: "",
    contact: "",
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});

    const { name, valueOne, valueTwo, valueThree, valueFour } = state;

    const history = useNavigate();

    const { id } = useParams();

    console.log(id)

    useEffect(() => {
        fireDb.child("contacts").on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setData({ ...snapshot.val() });
            } else {
                setData({});
            }
        });

        return () => {
            setData({});
        };
    }, [id]);
    
    useEffect(() => {
        if (id) {
            setState({ ...data[id] });
        } else {
            setState({ ...initialState });
        }

        return () => {
            setState({ ...initialState });
        };
    }, [id, data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !contact) {
            toast.error("Ada Beberapa Form Yang Kosong");
        } else {
            if (!id) {
                fireDb.child("contacts").push(state, (err) => {
                    if (err) {
                        console.log("Gagal")
                        toast.error(err);
                    } else {
                        console.log("Sukses")
                        toast.success("Berhasil Menambah Data");
                    }
                });
            } else {
                console.log(`contacts/${id}`)
                fireDb.child(`contacts/${id}`).set(state, (err) => {
                    if (err) {
                        console.log("Gagal")
                        toast.error(err);
                    } else {
                        console.log("Sukses")
                        toast.success("Berhasil Mengubah Data");
                    }
                });
            }

            setTimeout(() => history("/"), 500);
        }
    };

    return (
        <div style={{ marginTop: "100px" }}>
            <form
                style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center",
                }}
                onSubmit={handleSubmit}
            >
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name ..."
                    value={name || ""}
                    onChange={handleInputChange}
                />

                <label htmlFor="valueOne">Nilai 1</label>
                <input
                    type="number"
                    id="valueOne"
                    name="valueOne"
                    placeholder="Nilai Pertama ..."
                    value={valueOne || ""}
                    onChange={handleInputChange}
                />

                <label htmlFor="valueTwo">Nilai 2</label>
                <input
                    type="number"
                    id="valueTwo"
                    name="valueTwo"
                    placeholder="Nilai Kedua ..."
                    value={valueTwo || ""}
                    onChange={handleInputChange}
                />

                <label htmlFor="valueThree">Nilai 3</label>
                <input
                    type="number"
                    id="valueThree"
                    name="valueThree"
                    placeholder="Nilai Ketiga ..."
                    value={valueThree || ""}
                    onChange={handleInputChange}
                />

                <label htmlFor="valueFour">Nilai 4</label>
                <input
                    type="number"
                    id="valueFour"
                    name="valueFour"
                    placeholder="Nilai Keempat ..."
                    value={valueFour || ""}
                    onChange={handleInputChange}
                />

                <input type="submit" value={id ? "Update" : "Save"} />
            </form>
        </div>
    );
};

export default AddEdit
