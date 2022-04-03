import '../styles/agenthelper.css';

const AgentHelper = ({image, job, titles}) => {
    return ( 
        <div className="card">
           <img className="image" src={image} alt=""/>    
           <h2 className="job">{job}</h2>
           <h3 className="titles">{titles}</h3>
           <button className="btn">Learn More</button>
        </div>
        
     );
}
 
export default AgentHelper;