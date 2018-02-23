import {
	DiagramEngine,
	DiagramModel,
	DefaultNodeModel,
	LinkModel,
	DefaultPortModel,
	DiagramWidget,
	LinkWidget,
	LinkProps,
	DefaultLinkWidget
} from "../../src/main";
import { action } from "@storybook/addon-actions";
import * as React from "react";
import { LinkFactory } from "../../src/AbstractFactory";
import {DefaultLinkModel} from "../../src/defaults/models/DefaultLinkModel";
import {DefaultLinkFactory} from "../../src/defaults/factories/DefaultLinkFactory";

export class AdvancedLinkModel extends DefaultLinkModel {

	constructor() {
		super("advanced");
		this.width = 10;
	}
}

export class AdvancedPortModel extends DefaultPortModel {

	createLinkModel(): AdvancedLinkModel | null {
		return new AdvancedLinkModel();
	}
}

export class AdvancedLinkFactory extends DefaultLinkFactory {

	constructor() {
		super();
		this.type = "advanced"
	}

	getNewInstance(initialConfig?: any): AdvancedLinkModel {
		return new AdvancedLinkModel();
	}


	generateReactWidget(diagramEngine: DiagramEngine, link: AdvancedLinkModel): JSX.Element {
		return React.createElement(DefaultLinkWidget, {
			link,
			diagramEngine
		});
	}
}
/**
 *
 * Simple link styling demo
 *
 * @Author kfrajtak
 */
export default () => {
	//1) setup the diagram engine
	var engine = new DiagramEngine();
	engine.installDefaultFactories();
	engine.registerLinkFactory(new AdvancedLinkFactory());

	// create some nodes
	var node1 = new DefaultNodeModel("Source", "rgb(0,192,255)");
	let port1 = node1.addPort(new AdvancedPortModel(false, "out-1", "Out thick"));
	let port2 = node1.addPort(new DefaultPortModel(false, "out-2", "Out default"));
	node1.setPosition(100, 100);

	var node2 = new DefaultNodeModel("Target", "rgb(192,255,0)");
	var port3 = node2.addPort(new AdvancedPortModel(true, "in-1", "In thick"));
	var port4 = node2.addPort(new DefaultPortModel(true, "in-2", "In default"));
	node2.setPosition(300, 100);

	var node3 = new DefaultNodeModel("Source", "rgb(0,192,255)");
	node3.addPort(new AdvancedPortModel(false, "out-1", "Out thick"));
	node3.addPort(new DefaultPortModel(false, "out-2", "Out default"));
	node3.setPosition(100, 200);

	var node4 = new DefaultNodeModel("Target", "rgb(192,255,0)");
	node4.addPort(new AdvancedPortModel(true, "in-1", "In thick"));
	node4.addPort(new DefaultPortModel(true, "in-2", "In default"));
	node4.setPosition(300, 200);

	var model = new DiagramModel();

	model.addAll(port1.link(port3), port2.link(port4));

	// add everything else
	model.addAll(node1, node2, node3, node4);

	// load model into engine
	engine.setDiagramModel(model);

	// render the diagram!
	return <DiagramWidget diagramEngine={engine} />;
};
