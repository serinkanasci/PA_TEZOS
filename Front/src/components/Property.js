import '../styles/property.css';
import PropertyHelper from '../shared/PropertyHelper';

const Property = () => {

    const params = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

    return ( 
        <section className="properties">
        <h1>Property</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea deserunt non voluptatibus laborum, corporis similique ad perspiciatis eum?</p>
        <div className="all-cards">
           <PropertyHelper image="assets/home3.png" info="Housing 1"/>
           <PropertyHelper image="assets/home3.png" info="Housing 2"/>
           <PropertyHelper image="assets/home3.png" info="Housing 3"/>           
        </div>
    </section>
     );
}
 
export default Property;