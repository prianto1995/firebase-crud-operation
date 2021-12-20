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

const initialValues = {
    valueOne: "",
    valueTwo: "",
    valueThree: "",
    valueFour: "",
};

const AddEdit = () => {
    const [state,  setState] = useState(initialState);
    const [values,  setValue] = useState(initialValues);
    const [data, setData] = useState({});

    const { valueOne, valueTwo, valueThree, valueFour } = values;
    const { name, email, contact } = state;
    

    const history = useNavigate();

    const { id } = useParams();

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
            setValue({ ...data[id] });
        } else {
            setValue({ ...initialValues });
            setState({ ...initialState });
        }

        return () => {
            setValue({ ...initialValues });
            setState({ ...initialState });
        };
    }, [id, data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "name" || name === "contact" || name === "email") {
            setState({ ...state, [name]: value});
        } else {
            setValue({ ...values, [name]: value});
        } 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let dataValue
        if (id) {
            dataValue =  {
                valueOne: values.valueOne,
                valueTwo: values.valueTwo,
                valueThree: values.valueThree,
                valueFour: values.valueFour,
            };
        }
        const dataUpload = (!id) 
            ? {"name": state.name, "email": state.email, "contact": state.contact, "valueOne": values.valueOne, "valueTwo": values.valueTwo, "valueThree": values.valueThree, "valueFour": values.valueFour, "nilaiJson": JSON.stringify(values)}
            : {"name": state.name, "email": state.email, "contact": state.contact, "valueOne": values.valueOne, "valueTwo": values.valueTwo, "valueThree": values.valueThree, "valueFour": values.valueFour, "nilaiJson": JSON.stringify(dataValue)}

        if (!name || !email || !contact || !valueOne || !valueTwo || !valueThree || !valueFour) {
            toast.error("Ada Beberapa Form Yang Kosong");
        } else {
            if (!id) {
                fireDb.child("contacts").push(dataUpload, (err) => {
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
                fireDb.child(`contacts/${id}`).set(dataUpload, (err) => {
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
                id="formData"
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

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email ..."
                    value={email || ""}
                    onChange={handleInputChange}
                />

                <label htmlFor="contact">Contact</label>
                <input
                    type="number"
                    id="contact"
                    name="contact"
                    placeholder="Your Contact ..."
                    value={contact || ""}
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
