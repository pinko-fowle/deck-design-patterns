import React from 'react';

const Frag = React.Fragment;

export const observer = {
	name: "Observer",
	type: "behavioral",
	intent: `Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.`,
	aka: ["Dependents", "Publish-Subscribe"],
	motivation: <Frag>
			A common side-effect of partitioning a system into a collection of cooperating classes is the need to maintain consistency between related objects. ...
			The key objects in this pattern are <b>subject</b> and <b>observer</b>. A subject may have any number of dependent observers. All observers are notified whenever the subject undergoes a change in state.
		</Frag>,
	applicability: [
		`When an abstraction has two aspects, one dependent on the other. Encapsulating these aspects in separate objects lets you vary and reuse them independently.`,
		`When a change to one object requires changing others, and you don’t know how many objects need to be changed.`,
		`When an object should be able to notify other objects without making assumptions about who these objects are. In other words, you don’t want these objects tightly coupled.`
	],
	structureUrl: "/pattern/observer-structure.png",
	// participants:
	collaborationsUrl: "/pattern/observer-collaboration.png",
	consequences: [
		`The Observer pattern lets you vary subjects and observers independently. You can reuse subjects without reusing their observers, and vice versa. It lets you add observers without modifying the subject or other observers.`,
		<Frag>
			<i>Abstract coupling</i> between Subject and Observer. 
			All a subject knows is that it has a list of observers, each conforming to the simple interface of the abstract Observer class. The subject doesn’t know the concrete class of any observer. Thus the coupling between subjects and observers is abstract and minimal.
			<br/>
			Because Subject and Observer aren’t tightly coupled, they can belong to different layers of abstraction in a system. A lower-level subject can communicate and inform a higher-level observer, thereby keeping the system’s layering intact. If Subject and Observer are lumped together, then the resulting object must either span two layers (and violate the layering), or it must be forced to live in one layer or the other (which might compromise the layering abstraction).
		</Frag>,
		<Frag>
			Support for <i>broadcast communication.</i> 
			Unlike an ordinary request, the notification that a subject sends needn’t specify its receiver. The notification is broadcast automatically to all interested objects that subscribed to it. The subject doesn’t care how many interested objects exist; its only responsibility is to notify its observers. This gives you the freedom to add and remove observers at any time. It’s up to the observer to handle or ignore a notification.
		</Frag>,
		<Frag>
			<i>Unexpected updates.</i> 
			Because observers have no knowledge of each other’s presence, they can be blind to the ultimate cost of changing the subject. A seemingly innocuous operation on the subject may cause a cascade of updates to observers and their dependent objects. Moreover, dependency criteria that aren’t well-defined or maintained usually lead to spurious updates, which can be hard to track down.
			<br/>
			This problem is aggravated by the fact that the simple update protocol provides no details on what changed in the subject. Without additional protocol to help observers discover what changed, they may be forced to work hard to deduce the changes.
		</Frag>
	],
	implementation: [
		<Frag>
			<i>Mapping subjects to their observers.</i> 
			The simplest way for a subject to keep track of the observers it should notify is to store references to them explicitly in the subject. However, such storage may be too expensive when there are many subjects and few observers. One solution is to trade space for time by using an associative look-up (e.g., a hash table) to maintain the subject-to-observer mapping. Thus a subject with no observers does not incur storage overhead. On the other hand, this approach increases the cost of accessing the observers.
		</Frag>,
		<Frag>
			<i>Observing more than one subject.</i>
			It might make sense in some situations for an observer to depend on more than one subject. For example, a spreadsheet may depend on more than one data source. It’s necessary to extend the Update interface in such cases to let the observer know which subject is sending the notification. The subject can simply pass itself as a parameter in the Update operation, thereby letting the observer know which subject to examine.
		</Frag>,
		<Frag>
			Who triggers the update? The subject and its observers rely on the notification mechanism to stay consistent. But what object actually calls Notify to trigger the update? Here are two options:
			<br/>
			(a) Have state-setting operations on Subject call Notify after they change the subject’s state. The advantage of this approach is that clients don’t have to remember to call Notify on the subject. The disadvantage is that several consecutive operations will cause several consecutive updates, which may be inefficient.
			<br/>
			(b) Make clients responsible for calling Notify at the right time. The advantage here is that the client can wait to trigger the update until after a series of state changes has been made, thereby avoiding needless intermediate updates. The disadvantage is that clients have an added responsibility to trigger the update. That makes errors more likely, since clients might forget to call Notify.
		</Frag>,
		<Frag>
			<i>Dangling references to deleted subjects.</i>
			Deleting a subject should not produce dangling references in its observers. One way to avoid dangling references is to make the subject notify its observers as it is deleted so that they can reset their reference to it. In general, simply deleting the observers is not an option, because other objects may reference them, or they may be observing other subjects as well.
		</Frag>,
		<Frag>
			<i>Making sure Subject state is self-consistent before notification.</i>
			It’s important to make sure Subject state is self-consistent before calling Notify, because observers query the subject for its current state in the course of updating their own state. ...
		</Frag>,
		<Frag>
			<i>Avoiding observer-specific update protocols: the push and pull models.</i>
			Implementations of the Observer pattern often have the subject broadcast additional information about the change. The subject passes this information as an argument to Update. The amount of information may vary widely. ...
		</Frag>,
		<Frag>
			<i>Specifying modifications of interest explicitly.</i>
			You can improve update efficiency by extending the subject’s registration interface to allow registering observers only for specific events of interest. When such an event occurs, the subject informs only those observers that have registered interest in that event. One way to support this uses the notion of aspects for Subject objects. ...
		</Frag>,
		<Frag>
			<i>Encapsulating complex update semantics.</i>
			When the dependency relationship between subjects and observers is particularly complex, an object that maintains these relationships might be required. We call such an object a Change-Manager. Its purpose is to minimize the work required to make observers reflect a change in their subject. For example, if an operation involves changes to several interdependent subjects, you might have to ensure that their observers are notified only after all the subjects have been modified to avoid notifying observers more than once. ...
		</Frag>,
		<Frag>
			<i>Combining the Subject and Observer classes.</i>
			Class libraries written in languages that lack multiple inheritance (like Smalltalk) generally don’t define separate Subject and Observer classes but combine their interfaces in one class. That lets you define an object that acts as both a subject and an observer without multiple inheritance. In Smalltalk, for example, the Subject and Observer interfaces are defined in the root class Object, making them available to all classes.
		</Frag>
	],
	related: [
		<Frag>
			<i>Mediator:</i> By encapsulating complex update semantics, the ChangeManager acts as mediator between subjects and observers.
		</Frag>,
		<Frag>
			<i>Singleton:</i> The ChangeManager may use the Singleton pattern to make it unique and globally accessible.
		</Frag>
	]
}
