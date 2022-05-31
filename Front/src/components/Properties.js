import '../styles/properties.css';
import PropertiesHelper from '../shared/PropertiesHelper';

const Properties = () => {

    const params = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

    return ( 
        <section className="properties">
        <h1>Properties</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea deserunt non voluptatibus laborum, corporis similique ad perspiciatis eum?</p>
        <div className="all-cards">
           <PropertiesHelper image="assets/home3.png" info="Housing 1"/>
           <PropertiesHelper image="assets/home3.png" info="Housing 2"/>
           <PropertiesHelper image="assets/home3.png" info="Housing 3"/>
        </div>
        </section>
    );
}
 
export default Properties;