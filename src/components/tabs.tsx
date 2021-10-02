import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import HomeIcon from './icons/o2';

import Question from './icons/question';

import About from './about';
import Logo from './icons/logo';
import Symptoms from './icons/symptoms';
import Chip from './qcmCard';

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
    fontFamily: 'Titillium Web',
    overflowX: 'hidden',
    backgroundColor: 'rgba(224, 224, 224, 0.3)'
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
          style={{ height: 60, color: 'white', marginBottom: 10 }}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='on'
          aria-label='scrollable force tabs example'
        >
          <Tab
            className='tab'
            label='Home page'
            style={{
              lineHeight: 0,
              fontWeight: value === 0 ? 'bold' : 'normal'
            }}
            icon={<HomeIcon />}
            {...a11yProps(2)}
          />

          <Tab
            className='tab'
            label='Symptoms checker'
            style={{
              lineHeight: 0,
              fontWeight: value === 1 ? 'bold' : 'normal'
            }}
            icon={<Symptoms />}
            {...a11yProps(3)}
          />
          <Tab
            className='tab'
            style={{
              lineHeight: 0,
              fontWeight: value === 2 ? 'bold' : 'normal'
            }}
            label='About Covid'
            icon={<Question />}
            {...a11yProps(0)}
          />
        </Tabs>
      </div>
      <div className='tab-panels'>
        <TabPanel value={value} index={0}></TabPanel>
        <TabPanel value={value} index={1}>
          <Chip></Chip>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <About></About>
        </TabPanel>
      </div>
    </div>
  );
}
