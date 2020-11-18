import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
import DescriptionIcon from '@material-ui/icons/Description';

// core components
import GridContainer from "../../../Design/Grid/GridContainer.js";
import GridItem from "../../../Design/Grid/GridItem.js";
import InfoArea from "../../../Design/InfoArea/InfoArea.js"

import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle.js";




const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();

  const style = {
    feat: {
      marginTop: '-20px'
    },
    name: {
      color: '#37474f',
      fontWeight: 'bold'
    },
    spec: {
      color: '#37474f'
    },
    space: {
      marginTop: '20px'
    },
    body: {
      fontSize: '14px',
      lineHeight: '175%'
    }
  };

  return (
    <div className={classes.section}>
      
      <div style={style.space}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                    <h2 className={classes.title} style={style.feat}>Features</h2>
                    <br />
            
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                            <InfoArea
                                title="Job Recommendations"
                                description="With our recomendation system users can find the all relevent jobs that suits their needs.
                                By Finding the jobs, QuickPick can help provide the most relevent jobs that you are seeking in your career."
                                icon={DescriptionIcon}
                                iconColor="info"
                                vertical
                            />   
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <InfoArea
                                title="Verified Jobs"
                                description="All of the users on our network are verified and trusted. We do the research
                                for you. Each job Application you see is created by the authenticated user who is verified through login process"
                                icon={VerifiedUser}
                                iconColor="success"
                                vertical
                                />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <InfoArea
                                title="Secure"
                                description="Your information security is our top priority. Any data regarding our users 
                                are strictly kept within the system and affiliated Employers . Third-party authorization
                                and sales of personal information is strictly forbidden."
                                icon={Fingerprint}
                                iconColor="danger"
                                vertical
                                />              
                        </GridItem>
                    </GridContainer>
                
                </GridItem>
            </GridContainer>      
      </div>
    </div>
  );
}
