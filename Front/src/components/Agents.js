import '../styles/agent.css';
import AgentHelper from '../shared/AgentHelper';

const Agents = () => {

    const params = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

    return ( 
        <section className="agents">
            <h1>The Team</h1>
            <p>We are a team of 3 developers on this project :</p>
            <div className="all-cards">
               <AgentHelper image="assets/LAHOUCINE.png" info="Lahoucine Herouin"/>
               <AgentHelper image="assets/SERINKAN.png" info="Serinkan Asci"/>
               <AgentHelper image="assets/LISA.png" info="Lisa Oulmi"/>
            </div>
        </section>
     );
}
  
export default Agents;