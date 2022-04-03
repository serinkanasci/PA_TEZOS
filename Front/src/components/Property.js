import '../styles/agent.css';
import AgentHelper from '../shared/AgentHelper';

const Property = () => {

    const params = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

    return ( 
        <section className="agents">
        <h1>Property</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea deserunt non voluptatibus laborum, corporis similique ad perspiciatis eum?</p>
        <div className="all-cards">
           <AgentHelper image="assets/home3.png" job="Housing 1" title={params}/>
           <AgentHelper image="assets/home3.png" job="Housing 2" title={params}/>
           <AgentHelper image="assets/home3.png" job="Housing 3" title={params}/>           
        </div>
    </section>
     );
}
 
export default Property;