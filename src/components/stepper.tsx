import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CircularProgress, makeStyles, Theme } from '@material-ui/core';
import SingleQ from './singleQ';
import CustomizedSelects from './select';
import Swal from 'sweetalert2';
import ResultCard from './resultCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const Infermedica = require('infermedica');
const infermedica = new Infermedica({
  appId: '8d5d6688',
  appKey: '4b1b4b84ecaeb6126c5be3cabb38af29'
});
const steps = ['Basic info', 'Provide us some evidence', 'Get your results'];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [age, setAge] = React.useState(null);
  const [sexe, setSexe] = React.useState('');
  const [done, setDone] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [evidence, setEvidence] = React.useState('');
  const [evidenceArray, setEvidenceArray] = React.useState([]);
  const [question, setQuestion] = React.useState(null);
  const [allSet, setAllSet] = React.useState(false);
  const [conditions, setConditions] = React.useState([]);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const fetchingQs = (evid: any) => {
    setLoading(true);
    setError(false);
    infermedica
      .postDiagnosis({
        sex: sexe,
        age: age,
        evidence: evid,
        extras: { disable_groups: true }
      })
      .then((resp: any) => {
        console.log(resp);
        if (resp.should_stop === true) {
          setDone(true);
          setConditions(resp.conditions);
          Swal.fire({
            title: "You're all set!",
            icon: 'success',
            confirmButtonText: 'Okay'
          }).then((result) => {
            if (result.isConfirmed) {
              handleNext();
            }
          });
        } else {
          if (resp.question == null) {
            setError(true);
          } else {
            setQuestion(resp.question);
          }
        }
        setLoading(false);
      })
      .catch((err: any) => {
        setError(true);
        setLoading(false);
      });
  };
  const handleNext = () => {
    if (activeStep === 2) {
      setDone(true);
    } else {
      if (activeStep === 1) {
        setAllSet(true);
        setActiveStep(2);
      } else {
        const context = {
          text: evidence
        };
        setLoading(true);
        setError(false);
        infermedica
          .postParse(context)
          .then((res: any) => {
            var evid = res.mentions;
            evid = evid.map((e: any) => {
              e = { id: e.id, choice_id: e.choice_id, source: 'initial' };
              return e;
            });
            setEvidenceArray(evid);
            setLoading(false);

            fetchingQs(evid);
          })
          .catch((err: any) => {
            setError(true);
            setLoading(false);
          });

        const newActiveStep =
          isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
              // find the first step that has been completed
              steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      fontFamily: 'Titillium Web'
    }
  }));

  const classes = useStyles();
  return (
    <div>
      <Box
        sx={{
          margin: 10,
          width: '70vw',
          minHeight: '80vh',
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 4,
          boxShadow: '0px 0px 17px -5px rgba(0,0,0,0.2)'
        }}
      >
        <Stepper nonLinear activeStep={activeStep} sx={{ color: 'red' }}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton className={classes.root} color='inherit'>
                <p style={{ fontSize: 20 }}>{label}</p>
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 ? (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <p
                    style={{
                      fontSize: 24,
                      marginLeft: 10,
                      marginTop: 5,
                      width: '60%'
                    }}
                  >
                    Please provide us your age, gender and a describtive
                    paragraph of symptoms you currently have to start. Do note
                    that in order to pass to the next step, you need to fill all
                    the fields.
                  </p>

                  <CustomizedSelects
                    age={age}
                    setAge={setAge}
                    sexe={sexe}
                    setSexe={setSexe}
                    evidence={evidence}
                    setEvidence={setEvidence}
                  ></CustomizedSelects>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button
                      disabled={age === 0 || sexe === '' || evidence === ''}
                      onClick={handleNext}
                      sx={{ mr: 1 }}
                    >
                      {!allSet ? (
                        <p style={{ fontSize: 20 }}>Next</p>
                      ) : (
                        <p style={{ fontSize: 20 }}>Complete</p>
                      )}
                    </Button>
                  </Box>
                </Typography>
              ) : activeStep === 1 ? (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <div
                    style={{
                      display: 'grid',
                      placeItems: 'center',
                      height: '65vh'
                    }}
                  >
                    {loading ? (
                      <CircularProgress
                        style={{ color: '#58cad9' }}
                      ></CircularProgress>
                    ) : error ? (
                      <h1>Sorry, try again after refreshing the page.</h1>
                    ) : done ? (
                      <h1> </h1>
                    ) : (
                      <SingleQ
                        question={question}
                        setQuestion={setQuestion}
                        setEvidenceArray={setEvidenceArray}
                        evidenceArray={evidenceArray}
                        fetch={fetchingQs}
                      ></SingleQ>
                    )}
                  </div>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button color='inherit' onClick={handleBack} sx={{ mr: 1 }}>
                      <ArrowBackIosIcon
                        style={{ color: '#58cad9' }}
                      ></ArrowBackIosIcon>
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                  </Box>
                </Typography>
              ) : (
                <div className='results-tab'>
                  {conditions.map((e: any) => (
                    <ResultCard condition={e}></ResultCard>
                  ))}

                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button sx={{ mr: 1 }}>
                      <p style={{ fontSize: 20 }}>Complete</p>
                    </Button>
                  </Box>
                </div>
              )}
            </React.Fragment>
          )}
        </div>
      </Box>
    </div>
  );
}
