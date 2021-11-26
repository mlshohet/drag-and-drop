import Component from './base-component';
import { projectState } from '../state/project-state';
import { Autobind } from '../decorators/autobind';
import * as Validation from '../utils/validation';

// ProjectInput class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');

        this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
        this.descInputElement = this.element.querySelector("#description") as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;

        this.configure();
    }

    configure() {   
        this.element.addEventListener("submit", this.submitHandler);
    }

    renderContent() {}

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDesc = this.descInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validation.Validatable = {
            value: enteredTitle,
            required: true
        };

        const descValidatable: Validation.Validatable = {
            value: enteredDesc,
            required: true,
            minLength: 5
        };

        const peopleValidatable: Validation.Validatable = {
            value: +enteredPeople,
            required: true,
            min: 0,
            max: 5
        };

        if (
            !Validation.validate(titleValidatable) ||
            !Validation.validate(descValidatable) ||
            !Validation.validate(peopleValidatable)
        ) {
            alert("Invalid input!");
            return;
        } else {
            return [enteredTitle, enteredDesc, +enteredPeople];
        }
    }
    
    private clearInput = () => {
        this.titleInputElement.value = "";
        this.descInputElement.value = "";
        this.peopleInputElement.value = "";
    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInput();
        }
    }
    
}