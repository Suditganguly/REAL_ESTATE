import "./Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import SearchBar from "../SearchBar/SearchBar";
const Hero = () => {
  return (
    <section className="hero-wrapper ">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left side */}
        <div className="flexColStart  hero-left">
          <div className="hero-title outlinedText">
            <div className=" orange-circle" />
            <motion.h1
            initial={{ y: "2rem", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}

            >
              Buy land <br /> {/* title of hero panel*/}
              they're not making 
              <br /> it anymore
            </motion.h1>
          </div>
          <div className="flexColStart  secondaryTexthero flexhero-des">
            <span>Find a variety of properties that suit you very easily</span> {/*decripion*/}
            <span>Forget all difficulties in finding a residence for you</span>
          </div>
          <br />
          <br />
          <br />

          {/* <SearchBar/>

          <div className=" outlinedText flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={8800} end={9000} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Premium Product</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={1950} end={2000} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Happy Customer</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp end={28} /> <span>+</span>
              </span>
              <span className="secondaryText">Awards Winning</span>
            </div> 
          </div> */}
        </div>

        {/* right side */}
    
        <div className="flexColCenter hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
          
            className="image-container flexlefthero"
          >     

          <SearchBar/>
           <div className="flexCenter flextop stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={8800} end={9000} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Premium Product</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={1950} end={2000} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Happy Customer</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp end={28} /> <span>+</span>
              </span>
              <span className="secondaryText">Awards Winning</span>
            </div> 
          </div>
            {/* <img src="./hero-image.png" alt="houses" /> */}
          </motion.div>
        </div> 
      </div>
    </section>
  );
};

export default Hero;
