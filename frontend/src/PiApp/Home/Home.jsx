import './Home.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Step from './components/Step';
import BottomLead from './components/BottomLead';
import Footer from './components/Footer';

import logo from "./assets/logo.png";
import Rectangle_3 from './assets/Rectangle_3.png';
import Rectangle_4 from './assets/Rectangle_4.png';
import Rectangle_5 from './assets/Rectangle_5.png';


function Home() {
  const data = {
    hero:{
      appType: 'Pi Image Editor ',
      tagLine: 'Unleash Your Creativity with Our Image Editor!',
      description: 'With a wide range of editing features, you can transform your images into stunning works of art',
      mainActionText: 'Get Started',
      extraActionText: '-',
    },
    step1: {
      title: 'Create an account on Pi',
      heading: 'Create/login to an existing account to get started',
      description: 'An account is created with your PI Wallet',
      img: Rectangle_3,
      alternate: false,
    },
    step2: {
      title: 'Explore Wide Features ',
      heading: 'Edit and Crop the Images',
      description: 'Save Online/Offline ',
      img: Rectangle_4,
      alternate: true,
    },
    step3: {
      title: 'View Anywhere',
      heading: "When you're done, save it on your Drive.",
      description: "Download offline if you need .",
      img: Rectangle_5,
      alternate: false,
    },
    bottomLead: {
      actionText: 'Use the app now.',
      description: 'Available on your favourite browser. Start your premium experience now.',
      mainActionText: 'Pi Browser',
      extraActionText: '-',
    },
  }
  return (
    // __________________________TODO: ____________________
    // Add Montserrat font to everything (body)
    
    <div className="box-border">
      <div className="flex flex-col">
        
        <Navbar logo={logo}/>
        <Hero 
          appType={data.hero.appType}
          tagLine={data.hero.tagLine}
          description={data.hero.description}
          mainActionText={data.hero.mainActionText}
          extraActionText={data.hero.extraActionText}
        />
        
        <div id="divider" className="rounded-full ring-2 ring-gray-200 lg:w-1/2 lg:mx-auto "></div>
        
        <div id="faq" className="pt-20 mb-20 text-3xl font-semibold text-center text-blue-800 lg:font-bold">How the app works </div>
        
        <Step
          title={data.step1.title}
          heading={data.step1.heading}
          description={data.step1.description}
          img={data.step1.img}
          alternate={data.step1.alternate}
          />
          <Step
          title={data.step2.title}
          heading={data.step2.heading}
          description={data.step2.description}
          img={data.step2.img}
          alternate={data.step2.alternate}
          />
          <Step
          title={data.step3.title}
          heading={data.step3.heading}
          description={data.step3.description}
          img={data.step3.img}
          alternate={data.step3.alternate}
          />
          
          <BottomLead 
            actionText={data.bottomLead.actionText}
            description={data.bottomLead.description}
            mainActionText={data.bottomLead.mainActionText}
            extraActionText={data.bottomLead.extraActionText}
          />

          <Footer logo={logo}/>
      </div>
    </div>
  );
}

export default Home;
