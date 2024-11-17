import { Props, Tag } from "@src/types/types";

export const Button = <T extends Tag>(props: Props<T>) => {
	const { as: Component = 'button', children, ...rest } = props;

	return <Component {...rest}>{children}</Component>;
}