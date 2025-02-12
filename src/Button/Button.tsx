import { Props, Tag } from "src/types/types";

export const Button = <T extends Tag = "span">(props: Props<T>) => {
	const { as = "button", children, ...rest } = props;

	const Component = as;

	<Component {...rest}>{children}</Component>;
};
