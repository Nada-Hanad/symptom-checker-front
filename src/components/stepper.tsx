import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles, Theme } from '@material-ui/core';
import CustomizedSelects from './select';
const Infermedica = require('infermedica');
const infermedica = new Infermedica({
  appId: '8d5d6688',
  appKey: '4b1b4b84ecaeb6126c5be3cabb38af29'
});
const steps = [
  'Basic info',
  'Provide us some evidence',
  'Lets be more specific'
];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [age, setAge] = React.useState(0);
  const [sexe, setSexe] = React.useState('');
  const [evidence, setEvidence] = React.useState('');
  const [allSet, setAllSet] = React.useState(false);
  const [done, setDone] = React.useState(false);
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
  const handleNext = () => {
    if (activeStep === 2) {
      setDone(true);
    } else {
      if (activeStep === 1) {
        setAllSet(true);
        setActiveStep(2);
      } else {
        console.log(evidence);
        const context = {
          text: 'i feel smoach pain but no couoghing today'
        };
        const newAge = {
          value: age
        };
        infermedica
          .postParse(context)
          .then((res: any) => {
            var evid = res.mentions;
            evid = evid.map((e: any) => {
              e = { id: e.id, choice_id: e.choice_id };
              return e;
            });

            console.log(evid);
            const data = {
              sex: sexe,
              age: newAge,
              evidence: evid
            };
            console.log(JSON.stringify(data));
            infermedica
              .postDiagnosis(JSON.stringify(data))
              .then((resp: any) => {
                console.log(resp);
              })
              .catch((err: any) => {});
          })
          .catch((err: any) => {});
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
      {!done ? (
        <Box
          sx={{
            width: '70vw',
            height: '50vh',
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 4,
            boxShadow: '0px 0px 17px -5px rgba(0,0,0,0.2)'
          }}
        >
          <Stepper nonLinear activeStep={activeStep}>
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
                    <p style={{ fontSize: 24, marginLeft: 10, marginTop: 5 }}>
                      Please provide us your sexe and age to start. Do note that
                      in order to pass to the next step, you need to fill all
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
                  </Typography>
                ) : activeStep === 1 ? (
                  <Typography sx={{ mt: 2, mb: 1 }}>Step 2</Typography>
                ) : (
                  <Typography sx={{ mt: 2, mb: 1 }}>Step 3</Typography>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color='inherit'
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    <p style={{ fontSize: 20 }}>Back</p>
                  </Button>
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
              </React.Fragment>
            )}
          </div>
        </Box>
      ) : (
        'hello'
      )}
    </div>
  );
}
