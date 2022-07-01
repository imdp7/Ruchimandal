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
const shift = ["Morning","Evening"]

export default function Accordation({audio}) {
    return (
        <div className='p-3 m-2'>
        <Accordion TransitionProps={{ unmountOnExit: true }} allowMultipleExpanded="true" allowZeroExpanded="true">
            {days.map(acc => (

           
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                       Day {" "} {acc}
                    </AccordionItemButton>
                </AccordionItemHeading>
            <AccordionItemPanel>
                    {shift.map(s => (
                        <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            {s}
                        </AccordionItemButton>
                    </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>{audio}</p>
                            </AccordionItemPanel>
                            </AccordionItem>
                        ))}
                </AccordionItemPanel>
            </AccordionItem>
             ))}
        </Accordion>
        </div>
    );
}

