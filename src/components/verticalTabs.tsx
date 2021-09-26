import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Therap from "./therap";
import BasicKnowledge from "./basicKnowledge";
import SymptomTab from "./symptomsTab";
import IfSick from "./ifSick";
import Protect from "./protectYouself";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "rgba(224, 224, 224, 0.3);",
    display: "flex",
    color: "black",
    height: "90vh",
    overflowX: "hidden",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        TabIndicatorProps={{ style: { background: "#58cad9" } }}
        indicatorColor="primary"
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Basic knowledge" {...a11yProps(0)} />
        <Tab label="Symptoms" {...a11yProps(1)} />
        <Tab label="How to protect yourself and others" {...a11yProps(2)} />
        <Tab label="If you were sick" {...a11yProps(3)} />
        <Tab label="therapeutics" {...a11yProps(4)} />
      </Tabs>
      <div className="second-tabs">
        <TabPanel value={value} index={0}>
          <div className="whats-covid">
            <BasicKnowledge></BasicKnowledge>
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <SymptomTab></SymptomTab>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Protect></Protect>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <IfSick></IfSick>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Therap></Therap>
        </TabPanel>
      </div>
    </div>
  );
}