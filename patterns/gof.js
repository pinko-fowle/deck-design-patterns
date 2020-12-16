// preface
export const preface = {
	expectations: `This book isn’t an introduction to object-oriented technology or design. Many
		books already do a good job of that. This book assumes you are reasonably proficient in
		at least one object-oriented programming language, and you should have some experience in
		object-oriented design as well. You definitely shouldn’t have to rush to the nearest
		dictionary the moment we mention “types” and “polymorphism,” or “interface” as opposed
		to “implementation” inheritance.`,
	elegantSolutions: `On the other hand, this isn’t an advanced technical treatise either.
		It’s a book of design patterns that describes simple and elegant solutions to specific
		problems in object-oriented software design. Design patterns capture solutions that
		have developed and evolved over time. Hence they aren’t the designs people tend to
		generate initially. They reflect untold redesign and recoding as developers have
		struggled for greater reuse and flexibility in their software. Design patterns capture
		these solutions in a succinct and easily applied form.`,
	warning: `A word of warning and encouragement: Don’t worry if you don’t understand this book
		completely on the first reading. We didn’t understand it all on the first writing! Remember
		that this isn’t a book to read once and put on a shelf. We hope you’ll find yourself
		referring to it again and again for design insights and for inspiration.`
}

export const foreward = { // grady booch
	wellStructured: `All well-structured object-oriented architectures are full of patterns.
		Indeed, one of the ways that I measure the quality of an object-oriented system is to
		judge whether or not its developers have paid careful attention to the common
		collaborations among its objects. Focusing on such mechanisms during a system’s
		development can yield an architecture that is smaller, simpler, and far more
		understandable than if these patterns are ignored.`
}

export const whatAre = {
	// actually christopher alexander
	patternDescribesAProblem: `Each pattern describes a problem which
		occurs over and over again in our environment, and then describes the core
		of the solution to that problem, in such a way that you can use this
		solution a million times over, without ever doing it the same way twice.`,
	ooPatterns: `Even though Alexander was talking about patterns in
		buildings and towns, what he says is true about object-oriented design
		patterns. Our solutions are expressed in terms of objects and interfaces
		instead of walls and doors, but at the core of both kinds of patterns is
		a solution to a problem in a context.`
}

export const elements = {
	name: `The pattern name is a handle we can use to describe a design problem,
		its solutions, and consequences in a word or two. Naming a pattern immediately
		increases our design vocabulary. It lets us design at a higher level of abstraction.
		Having a vocabulary for patterns lets us talk about them with our colleagues, in
		our documentation, and even to ourselves. It makes it easier to think about designs
		and to communicate them and their trade-offs to others. Finding good names has been
		one of the hardest parts of developing our catalog.`,
	problem: `The problem describes when to apply the pattern. It explains the problem and its
		context. It might describe specific design problems such as how to represent algorithms
		as objects. It might describe class or object structures that are symptomatic of an
		inflexible design. Sometimes the problem will include a list of conditions that must be
		met before it makes sense to apply the pattern.`,
	solution: `The solution describes the elements that make up the design, their relationships,
		responsibilities, and collaborations. The solution doesn’t describe a particular concrete
		design or implementation, because a pattern is like a template that can be applied in
		many different situations. Instead, the pattern provides an abstract description of a
		design problem and how a general arrangement of elements (classes and objects in our
		case) solves it.`,
	consequences: `The consequences are the results and trade-offs of applying the pattern.
		Though consequences are often unvoiced when we describe design decisions, they are
		critical for evaluating design alternatives and for understanding the costs and benefits
		of applying the pattern.

		The consequences for software often concern space and time trade-offs. They may address
		language and implementation issues as well. Since reuse is often a factor in
		object-oriented design, the consequences of a pattern include its impact on a system’s
		flexibility, extensibility, or portability. Listing these consequences explicitly helps
		you understand and evaluate them.`
}

export const designPattern = `A design pattern names, abstracts, and identifies the key aspects of a
	common design structure that make it useful for creating a reusable object-oriented design.
	The design pattern identifies the participating classes and instances, their roles and
	collaborations, and the distribution of responsibilities. Each design pattern focuses on a
	particular object-oriented design problem or issue. It describes when it applies, whether it
	can be applied in view of other design constraints, and the consequences and trade-offs of
	its use.`


export const mvcExample = {
	pieces: `MVC consists of three kinds of objects. The Model is the application object, the
		View is its screen presentation, and the Controller defines the way the user interface
		reacts to user input. Before MVC, user interface designs tended to lump these objects
		together. MVC decouples them to increase flexibility and reuse.`,
	structure: `MVC decouples views and models by establishing a subscribe/notify protocol
		between them. A view must ensure that its appearance reflects the state of the model.
		Whenever the model’s data changes, the model notifies views that depend on it. In
		response, each view gets an opportunity to update itself. This approach lets you attach
		multiple views to a model to provide different presentations. You can also create new
		views for a model without rewriting it.`,
	invarianceObserver: `Taken at face value, this example reflects a design that decouples views from
		models. But the design is applicable to a more general problem: decoupling objects so
		that changes to one can affect any number of others without requiring the changed object
		to know details of the others. This more general design is described by the Observer 
		design pattern.`
}

export const mvcComposite = {
	pieces: `Another feature of MVC is that views can be nested. For example, a control panel
		of buttons might be implemented as a complex view containing nested button views. The
		user interface for an object inspector can consist of nested views that may be reused
		in a debugger. MVC supports nested views with the CompositeView class, a subclass of
		View. CompositeView objects act just like View objects; a composite view can be used
		wherever a view can be used, but it also contains and manages nested views.`,
	invariance: `Again, we could think of this as a design that lets us treat a composite view
		just like we treat one of its components. But the design is applicable to a more general
		problem, which occurs whenever we want to group objects and treat the group like an
		individual object. This more general design is described by the Composite design pattern.
		It lets you create a class hierarchy in which some subclasses define primitive objects
		(e.g., Button) and other classes define composite objects (CompositeView) that assemble
		the primitives into more complex objects.`
}

export const mvStrategy = {
	pieces: `MVC also lets you change the way a view responds to user input without changing its
		visual presentation. You might want to change the way it responds to the keyboard, for
		example, or have it use a pop-up menu instead of command keys. MVC encapsulates the response
		mechanism in a Controller object. There is a class hierarchy of controllers, making it easy
		to create a new controller as a variation on an existing one.`
	strategy: `A view uses an instance of a Controller subclass to implement a particular response
		strategy; to implement a different strategy, simply replace the instance with a different
		kind of controller. It’s even possible to change a view’s controller at run-time to let the
		view change the way it responds to user input. For example, a view can be disabled so that
		it doesn’t accept input simply by giving it a controller that ignores input events.`
	pattern: `The View-Controller relationship is an example of the Strategy design pattern. A
		Strategy is an object that represents an algorithm. It’s useful when you want to replace
		the algorithm either statically or dynamically, when you have a lot of variants of the
		algorithm, or when the algorithm has complex data structures that you want to encapsulate.`
}

export const desc = {
	nameAndClassification: `The pattern’s name conveys the essence of the pattern succinctly.
		A good name is vital, because it will become part of your design vocabulary. The
		pattern’s classification reflects the scheme we introduce in Section 1.5.`,
	intent: `A short statement that answers the following questions: What does the design
		pattern do? What is its rationale and intent? What particular design issue or problem
		does it address?`,
	aka: `Other well-known names for the pattern, if any.`,
	motivation: `A scenario that illustrates a design problem and how the class and object
		structures in the pattern solve the problem. The scenario will help you understand the
		more abstract description of the pattern that follows.`,
	applicability: `What are the situations in which the design pattern can be applied? What
		are examples of poor designs that the pattern can address? How can you recognize
		these situations?`,
	structure: `A graphical representation of the classes in the pattern using a notation based
		on the Object Modeling Technique (OMT). We also use interaction diagrams to illustrate
		sequences of requests and collaborations between objects. Appendix B describes these
		notations in detail.`,
	participants: `The classes and/or objects participating in the design pattern and their
		responsibilities.`,
	collaborations: `How the participants collaborate to carry out their responsibilities.`,
	consequences: `How does the pattern support its objectives? What are the trade-offs and
		results of using the pattern? What aspect of system structure does it let you vary
		independently?`,
	implementation: `What pitfalls, hints, or techniques should you be aware of when implementing
		the pattern? Are there language-specific issues?`,
	sampleCode: `Code fragments that illustrate how you might implement the pattern in C++ or
		Smalltalk.`,
	knownUses: `Examples of the pattern found in real systems. We include at least two examples
		from different domains.`,
	relatedPatterns: `What design patterns are closely related to this one? What are the
		important differences? With which other patterns should this one be used?`
}
