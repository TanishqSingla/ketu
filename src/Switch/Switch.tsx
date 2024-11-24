import { createContext } from "preact";
import { Props, Tag } from "../types/types";

import { Dispatch, StateUpdater, useContext } from "preact/hooks";
import { useUncontrolled } from "../hooks/useUncontrolled";

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
	 **/
	defaultChecked?: boolean;
}

interface ControlledSwitchProps extends UncontrolledSwitchProps {
	/**
	 * Controlled prop for Switch, value provided to this prop will make
	 * `Switch` component a controlled component.
	 *
	 * defaults to `false`
	 **/
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
export const Switch = <T extends Tag = "button">(
	props: Props<T, SwitchProps>,
) => {
	const { as = "button", children, defaultChecked, ...rest } = props;
	const { onValueChange, checked: _checked } = props as ControlledSwitchProps;

	const [checked, setChecked] = useUncontrolled({
		defaultValue: defaultChecked,
		value: _checked,
		finalValue: false,
		onChange: onValueChange,
	});

	const Comp: Tag = as;

	return (
		<SwitchContext.Provider value={{ checked, setChecked }}>
			<Comp data-checked={checked} role="switch" {...rest}>
				{children}
			</Comp>
			<input type="checkbox" checked={checked} />
		</SwitchContext.Provider>
	);
};

export const SwitchThumb = <T extends Tag = "span">(props: Props<T>) => {
	const context = useSwitchContext();

	const { as, children, ...rest } = props;

	const Comp: Tag = as ?? "span";

	return (
		<Comp data-checked={context.checked} {...rest}>
			{children}
		</Comp>
	);
};
