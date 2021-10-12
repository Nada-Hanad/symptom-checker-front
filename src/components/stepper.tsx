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
var axios = require('axios');
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
  const [recommendation, setRecommendation] = React.useState({
    recommended_specialist: {
      id: '',
      name: ''
    },
    recommended_channel: ''
  });
  const [done, setDone] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [evidence, setEvidence] = React.useState('');
  const [evidenceArray, setEvidenceArray] = React.useState([]);
  const [question, setQuestion] = React.useState(null);

  const [triage, setTriage] = React.useState({
    triage_level: '',
    serious: [],
    teleconsultation_applicable: false
  });

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
        if (resp.should_stop === true) {
          setDone(true);
          setConditions(resp.conditions.slice(0, 5));
          infermedica
            .postTriage({
              sex: sexe,
              age: age,
              evidence: evidenceArray
            })
            .then((triage: any) => {
              setTriage(triage);
            })
            .catch((err: any) => {
              setError(true);
            });
          var data = JSON.stringify({
            sex: sexe,
            age: { value: age },
            evidence: evidenceArray
          });
          var config = {
            method: 'post',
            url: 'https://api.infermedica.com/v3/recommend_specialist',
            headers: {
              'App-Key': '4b1b4b84ecaeb6126c5be3cabb38af29',
              'App-Id': '8d5d6688',
              'Content-Type': 'application/json'
            },
            data: data
          };
          axios(config)
            .then((resp: any) => {
              setRecommendation(resp.data);
            })
            .catch((err: any) => {
              setError(true);
            });
          Swal.fire({
            title: "You're all set!",
            icon: 'success',
            confirmButtonText: 'Okay',
            confirmButtonColor: '#58cad9'
          }).then((result) => {
            if (result.isConfirmed) {
              handleNext();
            }
          });
        } else {
          if (resp.question == null) {
            Swal.fire({
              title: 'Please provide us more intel to proceed.',
              icon: 'warning',
              confirmButtonText: 'Okay',
              confirmButtonColor: '#58cad9'
            }).then((result) => {
              if (result.isConfirmed) {
                handleBack();
              }
            });
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
    setAge(null);
    setSexe('');
    setEvidence('');
    setDone(false);
    setError(false);
  };
  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      fontFamily: 'Poppins',
      padding: 20
    }
  }));

  const classes = useStyles();
  return (
    <>
      <Box
        sx={{
          marginTop: 15,
          marginBottom: 10,
          width: '70vw',
          backgroundColor: 'white',
          borderRadius: 4,
          boxShadow: '0px 0px 17px -5px rgba(0,0,0,0.2)'
        }}
      >
        <div className='stepper-container'>
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
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around'
                      }}
                    >
                      <div style={{ width: 600 }}>
                        <p
                          style={{
                            fontSize: 20,
                            marginLeft: 10,
                            marginTop: 35,
                            marginBottom: 20
                          }}
                        >
                          Please provide us your age, gender and a describtive
                          paragraph of symptoms you currently have to start. Do
                          note that in order to pass to the next step, you need
                          to fill all the fields.
                        </p>

                        <CustomizedSelects
                          age={age}
                          setAge={setAge}
                          sexe={sexe}
                          setSexe={setSexe}
                          evidence={evidence}
                          setEvidence={setEvidence}
                        ></CustomizedSelects>
                      </div>
                      <div>
                        <div className='first-container'></div>
                      </div>
                    </div>

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Box sx={{ flex: '1 1 auto' }} />
                      <Button
                        disabled={age === 0 || sexe === '' || evidence === ''}
                        onClick={handleNext}
                        sx={{ mr: 1 }}
                      >
                        <p style={{ fontSize: 20 }}>Next</p>
                      </Button>
                    </Box>
                  </Typography>
                ) : activeStep === 1 ? (
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Button
                        color='inherit'
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        <ArrowBackIosIcon
                          style={{ color: '#58cad9' }}
                        ></ArrowBackIosIcon>
                      </Button>
                      <Box sx={{ flex: '1 1 auto' }} />
                    </Box>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        height: '65vh'
                      }}
                    >
                      {loading ? (
                        <div
                          className='single-question'
                          style={{ display: 'grid', placeItems: 'center' }}
                        >
                          <CircularProgress
                            style={{ color: '#58cad9' }}
                          ></CircularProgress>
                        </div>
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
                      <div className='second-container'></div>
                    </div>
                  </Typography>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className='results-tab'>
                      <div>
                        {conditions.map((e: any) => (
                          <ResultCard condition={e}></ResultCard>
                        ))}
                      </div>
                      <div className='triage'>
                        <div className='third-container'></div>
                        {triage.triage_level === 'self_care' ? (
                          <>
                            <h3>Self care</h3>
                            <p style={{ textAlign: 'center', fontSize: 18 }}>
                              a medical consultation is advised but not strictly
                              required; you should observe your symptoms and
                              consult a doctor if your symptoms worsen within 24
                              hours.
                            </p>
                          </>
                        ) : triage.triage_level === 'emergency' ? (
                          <>
                            <h3>Emergency</h3>
                            <p style={{ textAlign: 'center', fontSize: 18 }}>
                              the reported evidence may indicate a serious or
                              life-threatening condition and thus you may
                              require immediate medical attention.
                            </p>
                          </>
                        ) : (
                          <>
                            <h3>Consultation</h3>
                            <p style={{ textAlign: 'center', fontSize: 18 }}>
                              You may require a medical consultation when
                              possible. We recommend that you visit this type of
                              specialist:
                              {' ' +
                                recommendation.recommended_specialist?.name}
                              .
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    <Box sx={{ display: 'grid', placeItems: 'center', pt: 2 }}>
                      <Box sx={{ flex: '1 1 auto' }} />
                      <Button sx={{ mr: 1 }} onClick={handleReset}>
                        <p style={{ fontSize: 20 }}>Complete</p>
                      </Button>
                    </Box>
                  </div>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </Box>
    </>
  );
}
