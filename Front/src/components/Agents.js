import '../styles/agent.css';
import AgentHelper from '../shared/AgentHelper';

const Agents = () => {

    const params = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

    return ( 
        <section className="agents">
            <h1>Agents</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea deserunt non voluptatibus laborum, corporis similique ad perspiciatis eum?</p>
            <div className="all-cards">
               <AgentHelper image="assets/ag3.png" job="App Developer" title={params}/>
               <AgentHelper image="assets/ag3.png" job="Web Developer" title={params}/>
               <AgentHelper image="assets/ag3.png" job="Content Writer" title={params}/>
               
            </div>
        </section>
     );
}
  
export default Agents;