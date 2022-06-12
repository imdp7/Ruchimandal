import React from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

const days = [1, 2, 3, 4, 5]


export default function Accordation({audio}) {
    return (
        <div>
        <Accordion TransitionProps={{ unmountOnExit: true }}>
            {days.map(acc => (

           
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                       Day {" "} {acc}
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        {audio}
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
             ))}
        </Accordion>
        </div>
    );
}