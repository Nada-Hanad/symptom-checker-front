import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import HomeIcon from './icons/o2';
import HorizontalNonLinearStepper from './stepper';
import Question from './icons/question';
import About from './about';
import Logo from './icons/logo';
import Symptoms from './icons/symptoms';
import Doctor from '../assets/doctor';
import DoneIcon from '@mui/icons-material/Done';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SavingsIcon from '@mui/icons-material/Savings';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AddBoxIcon from '@mui/icons-material/AddBox';
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    overflowX: 'hidden',
    padding: 0
  }
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className='nav-bar'>
        <div className='left-nav'>
          <Logo></Logo>
          <h2 style={{ fontFamily: 'Dancing Script', fontSize: 30 }}>Medica</h2>
        </div>

        <Tabs
          className='tabs'
          value={value}
          style={{
            height: 60,
            color: 'white',
            marginBottom: 10
          }}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='on'
          aria-label='scrollable force tabs example'
        >
          <Tab
            className='tab'
            label='Home page'
            style={{
              padding: 0,
              lineHeight: 0,
              fontFamily: 'Poppins',
              fontSize: 16,
              fontWeight: value === 0 ? 'bolder' : 400
            }}
            icon={<HomeIcon />}
            {...a11yProps(2)}
          />

          <Tab
            className='tab'
            label='Symptoms checker'
            style={{
              lineHeight: 0,
              fontFamily: 'Poppins',
              fontSize: 16,
              fontWeight: value === 1 ? 'bolder' : 400
            }}
            icon={<Symptoms />}
            {...a11yProps(3)}
          />
          <Tab
            className='tab'
            style={{
              lineHeight: 0,
              fontFamily: 'Poppins',
              fontSize: 16,
              fontWeight: value === 2 ? 'bolder' : 400
            }}
            label='About Covid'
            icon={<Question />}
            {...a11yProps(0)}
          />
        </Tabs>
      </div>
      <div className='tab-panels'>
        <TabPanel value={value} index={0}>
          <div className='home-page'>
            <div className='home-page-upper'>
              <div className='text'>
                <h1 style={{ fontFamily: 'Zilla Slab' }}>
                  Can't decide if you need medical attention or not?
                </h1>
                <br />
                <h2>You stumbled upon the right place!</h2>
                <div className='container-home'>
                  <div className='item'>
                    <div className='inside-item'>
                      <DoneIcon style={{ fontSize: 28, margin: 0 }}></DoneIcon>
                      <p>93% engine accuracy</p>
                    </div>
                  </div>
                  <div className='item'>
                    <div className='inside-item'>
                      <DoneIcon style={{ fontSize: 28, margin: 0 }}></DoneIcon>
                      <p>8M+ health checkups</p>
                    </div>
                  </div>
                  <div className='item' style={{ border: 'none' }}>
                    <div className='inside-item'>
                      <DoneIcon style={{ fontSize: 28, margin: 0 }}></DoneIcon>
                      <p>Fast and easy to use</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='image'>
                <Doctor></Doctor>
              </div>
            </div>

            <div className='lower-home'>
              <div className='lower-item'>
                <AccessTimeIcon
                  style={{ fontSize: 32, marginBottom: 10, color: '#58cad9' }}
                ></AccessTimeIcon>

                <h2>44,000+ hours of physician review</h2>
                <br />
                <p>
                  Our medical database is fed from the world of science and
                  medicine through well-respected publications.
                </p>
              </div>
              <div className='lower-item'>
                <SavingsIcon
                  style={{ fontSize: 32, marginBottom: 10, color: '#58cad9' }}
                ></SavingsIcon>

                <h2>$18B</h2>
                <br />
                <p>
                  in healthcare savings per year when patients are led to proper
                  care.
                </p>
              </div>
              <div className='lower-item'>
                <MedicalServicesIcon
                  style={{ fontSize: 32, marginBottom: 10, color: '#58cad9' }}
                ></MedicalServicesIcon>
                <br />
                <div style={{ display: 'grid', placeItems: 'center' }}>
                  <div className='logo-inf'>
                    <AddBoxIcon
                      style={{
                        fontSize: 32,
                        marginBottom: 10,
                        color: '#2e85ff'
                      }}
                    ></AddBoxIcon>
                    <h3>Infermedica</h3>
                  </div>
                </div>

                <p>
                  Powered by the most leading APIs in medical fields with 9+
                  years of experience.
                </p>
              </div>
            </div>
            <h3>Click on the Symptoms checker tab and begin the experience!</h3>
            <p>Statistics provided by NEHI Research Brief, NPR.</p>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div id='checker' className='stepper-page'>
            <HorizontalNonLinearStepper></HorizontalNonLinearStepper>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className='covid-page'>
            <About></About>
          </div>
        </TabPanel>
      </div>
    </div>
  );
}
