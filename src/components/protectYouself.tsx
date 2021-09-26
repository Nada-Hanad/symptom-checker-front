import FadeIn from "react-fade-in";
import Cough from "../assets/cough";
import CoughX from "../assets/coughX";
import Group from "../assets/social-distancing";
import GroupX from "../assets/no-group";
import OutX from "../assets/mall";
import Out from "../assets/stay-home";
import HandsX from "../assets/no-handshake";
import Hands from "../assets/washing-hands";
import MaskX from "../assets/noMask";
import Mask from "../assets/face-mask";
import Eyes from "../assets/eyes";
import Nose from "../assets/nose";
import Door from "../assets/door-handle";
import Cleaning from "../assets/cleaning";
import Air from "../assets/fresh-air";
import News from "../assets/news";
import Olds from "../assets/oldOnes";
import Family from "../assets/famille";
export default function Protect() {
  return (
    <div className="protect">
      <FadeIn>
        <div className="compare-card">
          <div className="iconCard">
            <CoughX></CoughX>
            <br />
            <p>Do not spread your cough.</p>
          </div>

          <h4>Instead</h4>
          <div className="iconCard">
            <Cough></Cough>
            <br />
            <p>Cover it up with your arm.</p>
          </div>
        </div>
      </FadeIn>
      <FadeIn>
        <div className="compare-card">
          <div className="iconCard">
            <GroupX></GroupX>
            <br />
            <p>Avoid groups.</p>
          </div>

          <h4>Instead</h4>
          <div className="iconCard">
            <Group></Group>
            <br />
            <p>Keep 2m in between.</p>
          </div>
        </div>
      </FadeIn>
      <FadeIn>
        <div className="compare-card">
          <div className="iconCard">
            <OutX></OutX>
            <br />
            <p>Avoid unecessary outs.</p>
          </div>

          <h4>Instead</h4>
          <div className="iconCard">
            <Out></Out>
            <br />
            <p>Stay home.</p>
          </div>
        </div>
      </FadeIn>
      <FadeIn>
        <div className="compare-card">
          <div className="iconCard">
            <HandsX></HandsX>
            <br />
            <p>Don't shake hands.</p>
          </div>

          <h4>Instead</h4>
          <div className="iconCard">
            <Hands></Hands>
            <br />
            <p>Wash them occasionally.</p>
          </div>
        </div>
      </FadeIn>
      <FadeIn>
        <div className="compare-card">
          <div className="iconCard">
            <MaskX></MaskX>
            <br />
            <p>Don't touch your face.</p>
          </div>

          <h4>Instead</h4>
          <div className="iconCard">
            <Mask></Mask>
            <br />
            <p>Wear a face mask.</p>
          </div>
        </div>
      </FadeIn>
      <FadeIn>
        <div className="do-not">
          <div className="do-not-up">
            <Eyes></Eyes>
            <Nose></Nose>
            <Door></Door>
          </div>
          <h3>
            Do not touch your face, nose, and door handles with your bare hands
          </h3>
        </div>
      </FadeIn>
      <FadeIn>
        <div className="do-not">
          <div className="do-not-up">
            <Cleaning></Cleaning>
            <Air></Air>
            <News></News>
          </div>
          <h3>Clean and air your house and stay up to date with covid.</h3>
        </div>
      </FadeIn>
      <FadeIn>
        <div className="do-not">
          <div className="do-not-up">
            <Olds></Olds>
            <Family></Family>
          </div>
          <h3>To protect your elders and loved ones.</h3>
        </div>
      </FadeIn>
    </div>
  );
}
