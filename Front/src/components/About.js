import '../styles/about.css';
import AboutHelper from '../shared/AboutHelper'
import house from '../icons/house.svg';
import money from '../icons/money.svg';
import invest from '../icons/invest.svg';


const About = () => {

    const params = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

    return (
        <>
            <h1 className="main-head">
                We Are The Best<br/>Real Estate Company
            </h1>
            <p className="paras">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum possimus, sequi odio modi ex neque
             nisi incidunt totam in repellat molestias cum! Nesciunt eos vel maiores aliquid voluptates voluptatum quod.</p>
             <img src="/assets/home1.png" alt="home-image" className="home1-logo"/>
             <button className="btns">View More Details</button>
              
            <section className="about">
                <h1 className="header">HOW IT WORKS</h1>
                <div className="content">
                    <AboutHelper iconName={house} title="Find a Property" params={params} />
                    <AboutHelper iconName={money} title="Buy a Property" params={params} />
                    <AboutHelper iconName={invest} title="Invest on Property" params={params} />
                </div>
            </section>
        </>
    );
}

export default About;