import { createContext } from "preact";
import { Props, Tag } from "../types/types";

import { Dispatch, StateUpdater, useContext } from "preact/hooks";
import { useUncontrolled } from "../hooks/useUncontrolled";
import { KeyboardEvent } from "preact/compat";
import { JSXInternal } from "preact/src/jsx";

type TSwitchContext = {
	checked: boolean;
	setChecked: Dispatch<StateUpdater<boolean>> | ((value: boolean) => void);
};

const SwitchContext = createContext<TSwitchContext | null>(null);

function useSwitchContext() {
	const context = useContext(SwitchContext);

	if (context === null) {
		throw new Error("Component used outside <Switch>");
	}

	return context;
}

interface UncontrolledSwitchProps {
	/** defaultChecked
	 * Uncontrolled default value for Switch.
	 *
	 * If controlled props are provided, this value also overrides `checked`'s
	 * default value
	 */
	defaultChecked?: boolean;
	name?: string;
}

interface ControlledSwitchProps extends UncontrolledSwitchProps {
	/**
	 * Controlled prop for Switch, value provided to this prop will make
	 * `Switch` component a controlled component.
	 *
	 * defaults to `false`
	 */
	checked: boolean;
	onValueChange: (value: boolean) => void;
}
type SwitchProps = ControlledSwitchProps | UncontrolledSwitchProps;

/**
 * Switch
 *
 * Switch implements a <input type='checkbox'> under the hood, so it can be used
 * inside forms.
 */
export const Switch = <T extends Tag = "div">(props: Props<T, SwitchProps>): JSXInternal.Element => {
	const { as = "div", children, defaultChecked, name, ...rest } = props;
	const { onValueChange, checked: _checked } = props as ControlledSwitchProps;

	const [checked, setChecked] = useUncontrolled({
		defaultValue: defaultChecked,
		value: _checked,
		finalValue: false,
		onChange: onValueChange,
	});

	const handleKeyPress = (event: KeyboardEvent<any>) => {
		if (event.key === " ") {
			setChecked(!checked);
		}
	};

	const Comp = as;

	return (
		<SwitchContext.Provider value={{ checked, setChecked }}>
			<Comp
				data-checked={checked}
				role="switch"
				{...rest}
				onKeyPress={handleKeyPress}
			>
				{children}
			</Comp>
			<input
				type="checkbox"
				checked={checked}
				aria-hidden
				name={name}
				hidden
				tabIndex={-1}
			/>
		</SwitchContext.Provider>
	);
};

export const SwitchThumb = <T extends Tag = "span">(props: Props<T>): JSXInternal.Element => {
	const context = useSwitchContext();

	const { as = "span", children, ...rest } = props;

	const Comp = as;

	return (
		<Comp
			data-checked={context.checked}
			onClick={() => context.setChecked(!context.checked)}
			{...rest}
		>
			{children}
		</Comp>
	);
};
