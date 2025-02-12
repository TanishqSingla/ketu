import { Props, Tag } from "src/types/types";

export const Button = <T extends Tag = "button">(props: Props<T>) => {
	const { as = "button", children, ...rest } = props;

	const Component = as;

	return <Component {...rest}>{children}</Component>;
};
