import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import { useState } from 'react';
import Button from '@mui/material/Button';

export default function SingleQ({
  question,
  setQuestion,
  setEvidenceArray,
  evidenceArray,
  fetch
}: any) {
  const [chosen, setchosen] = useState(false);
  const [colors, setColors] = useState(['white', 'white', 'white']);
  const yes = () => {
    setColors(['#e2e2e2', 'white', 'white']);
    setchosen(true);
  };
  const no = () => {
    setColors(['white', '#e2e2e2', 'white']);
    setchosen(true);
  };
  const idk = () => {
    setColors(['white', 'white', '#e2e2e2']);
    setchosen(true);
  };
  const requestUpdate = () => {
    var newEvidence;
    if (colors[0] === '#e2e2e2') {
      newEvidence = {
        id: question.items[0].id,
        choice_id: 'present'
      };
    } else if (colors[1] === '#e2e2e2') {
      newEvidence = {
        id: question.items[0].id,
        choice_id: 'absent'
      };
    } else {
      newEvidence = {
        id: question.items[0].id,
        choice_id: 'unknown'
      };
    }
    var newArray = [...evidenceArray, newEvidence];
    console.log(question);
    console.log(newArray);
    setEvidenceArray(newArray);
    fetch(newArray);
    setchosen(false);
  };
  return (
    <div className='single-question'>
      <div className='q'>
        <p style={{ fontSize: 18, marginBottom: 10 }}>{question?.text}</p>
      </div>

      <div className='options'>
        <div
          className='option'
          style={{ backgroundColor: colors[0] }}
          onClick={yes}
        >
          <DoneOutlineOutlinedIcon
            style={{ color: '#ACD687', fontSize: 20, padding: 5 }}
          ></DoneOutlineOutlinedIcon>
          <p>Yes</p>
        </div>
        <div
          className='option'
          style={{ backgroundColor: colors[1] }}
          onClick={no}
        >
          <AddOutlinedIcon
            style={{
              color: 'red',
              fontSize: 22,
              padding: 5,
              transform: 'rotate(45deg)'
            }}
          ></AddOutlinedIcon>
          <p>No</p>
        </div>
        <div
          className='option'
          style={{ backgroundColor: colors[2] }}
          onClick={idk}
        >
          <ContactSupportOutlinedIcon
            style={{ color: '#8DAEDC', fontSize: 20, padding: 5 }}
          ></ContactSupportOutlinedIcon>
          <p>I don't know.</p>
        </div>
      </div>
      <br />
      <div
        style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
      >
        <Button onClick={requestUpdate} sx={{ mr: 1 }} disabled={!chosen}>
          <p style={{ fontSize: 16 }}>Next</p>
        </Button>
      </div>
    </div>
  );
}
