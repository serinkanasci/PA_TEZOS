import '../styles/propertieshelper.css';

const PropertiesHelper = ({image, info}) => {
    return ( 
        <div className="card">
           <img className="image" src={image} alt=""/>    
           <h2 className="info">{info}</h2>
        </div>
     );
}
 
export default PropertiesHelper;