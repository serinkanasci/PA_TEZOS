import '../styles/agenthelper.css';

const AgentHelper = ({image, info}) => {
    return ( 
        <div className="card">
           <img className="image" src={image} alt=""/>    
           <h2 className="info">{info}</h2>
        </div>
     );
}
 
export default AgentHelper;