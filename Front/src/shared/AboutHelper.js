import '../styles/abouthelper.css';


const AboutHelper = ({iconName, title, params}) => {
    return ( 
        <div className="helper">
            <img className="icons" src={iconName} alt=""/>
            <span className="titles">{title}</span>
            <p className="para">{params}</p>
        </div>
     );
}
 
export default AboutHelper;