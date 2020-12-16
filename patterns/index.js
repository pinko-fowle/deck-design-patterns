import React from 'react';
import ReactDOM from 'react-dom';
//import NovaTheme from "spectacle-theme-nova/bundle";
//import "spectacle-theme-nova/syntax/prism.nova.css";
//import "spectacle-theme-nova/syntax/prism-javascript";

import {
  Appear,
  Box,
  CodePane,
  CodeSpan,
  Deck,
  FlexBox,
  FullScreen,
  Grid,
  Heading,
  Image,
  ListItem,
  Markdown,
  Notes,
  OrderedList,
  Progress,
  Quote,
  Slide,
  SpectacleLogo,
  Stepper,
  Text,
  UnorderedList,
  indentNormalizer
} from 'spectacle';

import * as gof from "./gof.js"
import * as links from "./links.js"
import * as pl from "./pattern-lang.js"
import * as patterns from "./patterns.js"

// SPECTACLE_CLI_THEME_START
const theme = {
  fonts: {
    header: '"Open Sans Condensed", Helvetica, Arial, sans-serif',
    text: '"Open Sans Condensed", Helvetica, Arial, sans-serif'
  },
	colors: {
		primary: "#E6EEF3",
		secondary: "#7FC1CA",
		tertiary: "#3C4C55",
		yellow: "#DADA93",
		//tertiary: "#DADA93",
		//background: "#3C4C55"
	}
};
// SPECTACLE_CLI_THEME_END

// apparently Spectacle has changed it's themes entirely since 2017?
//const novaTheme = NovaTheme();

// SPECTACLE_CLI_TEMPLATE_START
const template = () => (
  <FlexBox
    justifyContent="space-between"
    position="absolute"
    bottom={0}
    width={1}
  >
    <Box padding="0 0.3em">
      <FullScreen />
    </Box>
	{/*
    <Box padding="1em">
      <Progress />
    </Box>
	*/}
  </FlexBox>
);
// SPECTACLE_CLI_TEMPLATE_END

const cppCodeBlock = `
import <stdio.h>
import <iostream.h>

int main(string[] args){
	stdout << "hello" << "world";
}
`

const formidableLogo = "/cover-gof.png";

const index = [
	"Foreward", // 0
	"What is a Design Pattern?", // 1
	"What? Elements of Design Patterns", // 2
	"In depth with Observer Pattern", // 3
	"Some more MVC patterns", //4 
	"Where did Design Patterns come from?", // 5
	"What kinds of design patterns are there?", // 6
	"What do we hope to gain from design patterns?",
]

const snake = n => n.toLowerCase().replaceAll(/ /g, "_").replaceAll(/[?]/g, "")

const TakeAwaySlide = () => (<Slide>
		<Heading mb="0px">Take-aways from this talk</Heading>
		<UnorderedList margin="0 auto">
			<Appear elementNum={0}>
				<ListItem>Some sense of <b>what</b> patterns are, how they can help us</ListItem>
			</Appear>
			<Appear elementNum={1}>
				<ListItem>Knowledge of the <b>availability</b> of patterns to help us figure out what code to build</ListItem>
			</Appear>
			<Appear elementNum={2}>
				<ListItem>See that patterns give us <b>vocabulary/language</b> to talk to others with</ListItem>
			</Appear>
			<Appear elementNum={3}>
				<ListItem>Insight to <b>recognize</b> patterns when reading code</ListItem>
			</Appear>
		</UnorderedList>
	</Slide>)


const IndexSlide = props => {
	const color = i => props.n < i ? "primary" : "secondary"
	const title = index[props.n]
	return <Slide id={snake(title)}>
		<Heading fontSize="h3" margin="24px 24px 0px" >Design Patterns Intro</Heading>
		<OrderedList>
			{index.map((item, n) => <ListItem key={n} fontWeight="bold" fontSize="2rem" margin="0.1rem" color={color(n)}>{item}</ListItem>)}
		</OrderedList>
		<Notes>{title}</Notes>
	</Slide>
}

const PatternSlide = props => {
	const p = props.pattern
	const aka = p.aka && (<Frag><b>AKA:</b> {p.aka && p.aka.join(", ")}<br/></Frag>) || ""
	return (<Slide id={p.name}>
			<Heading margin="12px 24px 0px">{p.name} Pattern</Heading>
			<Text margin="0px 12px" padding="16px 16px 0px" fontSize="2rem">
				<b>Intent:</b> {p.intent}
				<br/>
				{aka}
				<b>Motivation:</b>: {p.motivation}
				<br/>
				<b>Applicability:</b>
			</Text>
			<UnorderedList margin="0px 16px">
				{p.applicability.map((a, i) => <ListItem key={i} margin="0px 16px" fontSize="2rem">{a}</ListItem>)}
			</UnorderedList>
		</Slide>)
}

const makeListMapper = (extraProps) => (children, i) => <ListItem key={i} {...extraProps}>{children}</ListItem>

const smallListMapper = makeListMapper({ fontSize: "1.7rem" })

const mapRange = (arr, start, end, mapper) => {
	let output= []
	for (let i = start; i < end; ++i) {
		const el = arr[i]
		if (el === undefined) {
			continue
		}
		const mapped = mapper(el, i, arr)
		output.push(mapped)
	}
	return output
}

// styles
const trim = { margin: "0px", padding: "0px" }
const primary = { color: "primary" }
const secondary = { color: "secondary" }
const tertiary = { color: "tertiary" }
const unbold = { fontWeight: "normal" }

// composite styles
const sub = { ...trim, ...primary, fontSize: "h3" }

// helpers

const AI = props => { // AI, abbreviation of "Appear listItem"
	return (
		<Appear elementNum={props.n}>
			<ListItem>
				{props.children}
			</ListItem>
		</Appear>
	)
}

const Frag = React.Fragment;

const Sub = props => <Heading {...sub} {...props}>{props.children}</Heading>

// content

const designPatternSpace = "/design-pattern-space.jpg"

const Presentation = () => (
	<Deck theme={theme} template={template} transitionEffect="fade">
		<Slide>
			<FlexBox height="100%" flexDirection="column" m="0">
				<Heading fontSize="96px" margin="0px">Design Patterns</Heading>
				<Image src="/cover-gof.png" height="50vh" />
			</FlexBox>
		</Slide>
		{IndexSlide({n: 0})}
		<Slide>
			<Heading>(Less than) Two brief minutes,</Heading>
			<Sub>To situate ourselves in this presentation</Sub>
		</Slide>
		<Slide>
			<Sub>This presentation is very much about</Sub>
			<Heading>Design Patterns: Elements of Reusable Object-Oriented Software</Heading>
			<Appear elementNum={0}>
				<Sub>But we are going to meander-by-example our way towards the book</Sub>
			</Appear>
			<Appear elementNum={1}>
				<Sub>(Hold tight)</Sub>
			</Appear>
		</Slide>
		<Slide>
			<Heading>Fore <s>Warning</s> Resting</Heading>
			<Appear elementNum={0}>
				<Sub>This talk has a lot going on! 📚</Sub>
				<Sub>Don't worry if it doesn't all click! 😅</Sub>
			</Appear>
			<Appear elementNum={1} >
				<Quote>
					{gof.preface.warning}
					<br/>- Preface, Design Patterns
				</Quote>
			</Appear>
		</Slide>
		<Slide transitionEffect="slide">
			<Heading>💡</Heading>
			<Sub {...unbold}>This should give you ideas, & give you some context</Sub>
			<Sub {...unbold}>That you can use to begin to think about code differently with</Sub>
		</Slide>
		{TakeAwaySlide()}

		{IndexSlide({n: 1})}
		<Slide>
			<Heading>What is a Design Patterns?</Heading>
			<Quote>
				{gof.whatAre.patternDescribesAProblem}
			</Quote>
			<Appear elementNum={0}>
				<Quote fontSize="2.2rem" >
					{gof.foreward.wellStructured}
					<br/>-Foreward, Design Patterns, Grady Booch
				</Quote>
			</Appear>
			<Notes>
				Christopher Alexander, but deliberate unquoted, we get to that
			</Notes>
		</Slide>
		<Slide>
			<Sub margin="24px 0px 0px">We are going to talk more about what design patterns are,</Sub>
			<Heading>But...</Heading>
			<Appear elementNum={0}>
				<Sub>To ground ourselves,</Sub>
				<Sub>⏚</Sub>
				<Heading>A small example!</Heading>
			</Appear>
		</Slide>
		<Slide>
			<Heading margin="24px 24px 0px" padding="16px 16px 0px" >A Small(talk) Example: MVC</Heading>
			<Quote fontSize="2.3rem">
				{gof.mvcExample.pieces}
			</Quote>
			<Quote fontSize="2.3rem">
				{gof.mvcExample.structure}
			</Quote>
		</Slide>
		<Slide>
			<Text></Text>
			<Text>This captures the core ideas of a design pattern</Text>
			<Appear elementNum={0}>
				<Text>An <b>identified</b>, <b>resuable</b> <b>solution</b> to commonly re-ocurring <b>problems</b> or situations</Text>
			</Appear>
			<Sub>Let's look at the elements of a Design Pattern a little more closely!</Sub>
		</Slide>
		{IndexSlide({n: 2})}

		<Slide>
			<Heading>MVC: a Smalltalk pattern</Heading>
			<Text margin="0px 16px">MVC, with it's model, view, & controller, is a pattern in Smalltalk.</Text>
			<UnorderedList>
				{AI({n: 0, children: <Frag>It has a <b>name</b> (mvc)</Frag>})}
				{AI({n: 1, children: <Frag>It's something <b>common</b> and repeated</Frag>})}
				{AI({n: 2, children: <Frag>It presents a <b>solution</b> to a <b>problem</b><br/>(specialization over code being lumped together)</Frag>, margin: "16px 16px 6px"})}
				{AI({n: 3, children: <Frag>We would not expect two programs to to have identical MVC implementations</Frag>})}
			</UnorderedList>
		</Slide>
		<Slide>
			<Sub color="secondary"><i>Design Patterns</i> identifies 4 elements to a Design Pattern:</Sub>
			<Text fontSize="2.1rem"><b>Name:</b> "{gof.elements.name}"</Text>
			<Text fontSize="2.1rem"><b>Problem:</b> "{gof.elements.problem}"</Text>
		</Slide>
		<Slide>
			<Sub color="secondary"><i>Design Patterns</i> identifies 4 elements to a Design Pattern:</Sub>
			<Text fontSize="2.1rem"><b>Solution:</b> "{gof.elements.solution}"</Text>
			<Text fontSize="2.1rem"><b>Consequences:</b> "{gof.elements.consequences}"</Text>
		</Slide>
		<Slide>
			<Heading>All together: Design Pattern</Heading>
			<Quote>
				{gof.designPattern}
			</Quote>
		</Slide>
		<Slide>
			<Heading margin="24px 24px 0px" >Abstraction & Pattern Languages</Heading>
			<Text margin="0px 16px">
				We looked at Smalltalk's invention of MVC, & found the elements of a Design Pattern:
				<br/>
				Name, Problem, Solution, Consequences.
				<br/>
				And yet...
			</Text>
			<Appear elementNum={0}>
				<Quote margin="8px 16px">{gof.mvcExample.invarianceObserver}</Quote>
			</Appear>
		</Slide>
	
		{IndexSlide({n: 3})}
		<Slide>
			<Sub>Looking at our first official pattern</Sub>
			<Quote margin="8px 16px">{gof.mvcExample.invarianceObserver}</Quote>
			<Text>
				We'll come back to the topic of what makes a good design pattern latter, once we're a little more familiar with some other patterns. For now:
				<br/>
				Let's go check out our first official <i>Design Patterns</i> pattern: <b>Observer Pattern</b>.
			</Text>
		</Slide>
		{PatternSlide({pattern: patterns.observer})}
		<Slide>
			<Sub color="secondary">Diagram: Structure</Sub>
			<Text><i>Design Patterns</i> also includes some diagrams describing the <b>structure</b>...</Text>
			<FlexBox alignItems="center">
				<Image src={patterns.observer.structureUrl} size="95%"/>
			</FlexBox>
			<Notes>
				Object Modeling Technique (OMT), 1991, a predecessor to more common well-known modern UML
				Example, door-bell
			</Notes>
		</Slide>
		<Slide>
			<Sub color="secondary">Diagram: Collaborations</Sub>
			<Text>...as well as diagrams for <b>collaborations/sequence/actions</b></Text>
			<FlexBox alignItems="center">
				<Image src={patterns.observer.collaborationsUrl} size="85%"/>
			</FlexBox>
			<Notes>
				Only seeing what happens after Observer has Attached, a Notify / Update cycle
			</Notes>
		</Slide>
		<Slide>
			<Heading>There's more!</Heading>
			<Text>We're not going to cover all of these in detail, and won't even flash through the complete text in future patterns, but let's get a feel for how <i>Design Patterns</i> defines their design patterns. It goes very deep!</Text>
			<UnorderedList fontSize="1.7rem" margin="0px 16px">
				<ListItem><b>Consequences:</b> bullet point features of this pattern</ListItem>
				<ListItem><b>Implementation:</b> concerns & trade-offs while implementing</ListItem>
				<ListItem><b>Sample Code</b> (C++ implementation of a Digital Clock)</ListItem>
				<ListItem><b>Known Uses</b> (Smalltalk, ET++, THINK, Interview, Andrew Toolkit, Unidraw)</ListItem>
				<ListItem><b>Related Patterns</b> (Mediator, Singleton)</ListItem>
			</UnorderedList>
		</Slide>
		<Slide>
			<Sub>Observer: Consequences 1</Sub>
			<OrderedList start={0}>
				{mapRange(patterns.observer.consequences, 0, 3, smallListMapper)}
			</OrderedList>
		</Slide>
		<Slide>
			<Sub>Observer: Consequences 2</Sub>
			<OrderedList start={3}>
				{mapRange(patterns.observer.consequences, 3, 6, smallListMapper)}
			</OrderedList>
		</Slide>
		<Slide>
			<Sub>Observer: Implementation 1</Sub>
			<OrderedList>
				{mapRange(patterns.observer.implementation, 0, 2, smallListMapper)}
			</OrderedList>
		</Slide>
		<Slide>
			<Sub>Observer: Implementation 2</Sub>
			<OrderedList start={3}>
				{mapRange(patterns.observer.implementation, 2, 5, smallListMapper)}
			</OrderedList>
		</Slide>
		<Slide>
			<Sub>Observer: Implementation 3</Sub>
			<OrderedList start={6}>
				{mapRange(patterns.observer.implementation, 5, 20, smallListMapper)}
			</OrderedList>
		</Slide>
		<Slide>
			<Heading>What have we seen about Design Patterns?</Heading>
			<Text>
				We've found a good overview of a <b>problem</b>, and a <b>solution</b>, which is named
				<br/>
				It's given us framing to talk about structure, action, implementations, and consequences
				<br/>
				It's linked to other related patterns
			</Text>
		</Slide>
		<Slide>
			<Heading>What have we seen about Design Patterns?</Heading>
			<Text margin="0px 16px">
				<i>Design Patterns</i> showed a specific implementation Observer Pattern, but also talked to:
			</Text>
			<UnorderedList fontSize="2rem">
				<ListItem>different push/pull models</ListItem>
				<ListItem>ways to coordinate updates</ListItem>
				<ListItem>triggering strategies</ListItem>
				<ListItem>filtering which updates the observer gets</ListItem>
			</UnorderedList>
		</Slide>
		<Slide>
			<Heading>A pattern is general, and adaptable</Heading>
			<Text>
				A good pattern can be adapted to the environment.
			</Text>
			<Quote>
				{pl.elements.imposeNothing}
				<br/>
				- Christopher Alexander &al, <i>A Pattern Language</i>
			</Quote>
		</Slide>

		{IndexSlide({n: 4})}
		<Slide>
			<Sub>Invariance</Sub>
			<Heading>Unpacking other patterns from MVC</Heading>
			<UnorderedList margin="16px auto">
				<ListItem>Observer</ListItem>
				<ListItem>Composite</ListItem>
				<ListItem>Strategy</ListItem>
				<ListItem>Factory</ListItem>
			</UnorderedList>
		</Slide>
		<Slide>
			<Heading margin="12px 16px 0px">MVC & the <i>Composite</i> Pattern</Heading>
			<Quote fontSize="2rem">{gof.mvcComposite.pieces}</Quote>
			<Quote fontSize="2rem">{gof.mvcComposite.invariance}</Quote>
			<Notes>Show off diagrams from book</Notes>
		</Slide>
		{PatternSlide({pattern: patterns.composite})}

		<Slide>
			<Heading margin="12px 16px 0px">MVC & the <i>Strategy</i> Pattern</Heading>
			<Quote fontSize="2rem">{gof.mvcStrategy.pieces}</Quote>
			<Quote fontSize="2rem">{gof.mvcStrategy.invariance}</Quote>
			<Notes>Show off diagrams from book</Notes>
		</Slide>

		{IndexSlide({n: 5})}

		{/* patterns you (the audience) know: prototype, singleton,   */}
		{/* favorite patterns:	*/}

		<Slide>
			<Heading>A start for design patterns</Heading>
			<Text>We've been looking for patterns informally... forever?</Text>
			<Text>But...</Text>
		</Slide>
		<Slide>
			<Heading>Ward Cunningham & Kent Beck, 1987</Heading>
			<Quote>
				Ward cautioned against requiring too much programming at, what he termed,
				'the high level of wizards.' He pointed out that a written 'pattern language'
				can significantly improve the selection and application of abstractions. He
				proposed a 'radical shift in the burden of design and implementation' basing the
				new methodology on an adaptation of Christopher Alexander's work in pattern
				languages and that programming-oriented pattern languages developed at Tektronix
				has significantly aided their software development efforts.
				<br/>
				- Reid Smith, Panel On Design Methodology, OOPSLA 1987
			</Quote>
		</Slide>
		<Slide>
			<Sub>Christopher Alexander</Sub>
			<FlexBox height="100%">
				<Appear elementNum={1} id="timeless">
					<Heading fontSize="h3">The Timeless Way of Building</Heading>
					<Image src="/cover-timeless-way.jpg" height="50vh" />
				</Appear>
				<Appear elementNum={0} id="pattern">
					<Heading fontSize="h3">A Pattern Language</Heading>
					<Image src="/cover-pattern-language.jpg" height="50vh" />
				</Appear>
			</FlexBox>
		</Slide>

		{IndexSlide({n: 6})}
		{IndexSlide({n: 7})}
		{TakeAwaySlide()}
	</Deck>
);

ReactDOM.render(<Presentation />, document.getElementById('root'));
