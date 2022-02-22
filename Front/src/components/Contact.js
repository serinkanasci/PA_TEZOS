import {useState} from 'react';
import '../styles/contact.css';

const Contact = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [describe, setDescribe] = useState();

    const resetForm = () => { 
        setName("");
        setEmail("");
        setPhone("");
        setDescribe("");
      }
    const handleSubmit =(e)=>{
        e.preventDefault();
        const contact = {name, email, phone, describe};
        console.log(contact);
        alert(`Thank You for contacting us ${contact.name}`);
        resetForm();
    }

    return (
        <div>
            <section className="contact">
                <h1 className="head1">CONTACT</h1>
                <span>
                    <h5 className="head2">Looking forward to answering your email</h5>
                    <form className="forms" onSubmit={handleSubmit} className="cforms" >
                        <input type="text"  placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} className="c-inputs" required/>
                        <input type="email"  placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="c-inputs" required/>
                        <input type="tel" placeholder="Phone" value={phone}  onChange={(e) => setPhone(e.target.value)} className="c-inputs" required/>
                        <textarea cols="30" rows="10" placeholder="Type your message here..." value={describe} onChange={(e)=>setDescribe(e.target.value)} className="c-textarea" required></textarea>
                        <button type="submit" className="c-btn">Submit</button>
                    </form>
                </span>
            </section>
        </div>
    );
}

export default Contact;