import { ComponentChildren, ComponentType, JSX } from "preact";

export type Tag = keyof JSX.IntrinsicElements | ComponentType<any>;

type OurProps<T extends Tag> = {
	as?: T;
	children?: ComponentChildren;
};

type HTMLPropsOf<T extends Tag> = T extends keyof JSX.IntrinsicElements
	? JSX.IntrinsicElements[T]
	: never;
type CustomComponentProps<T extends Tag> =
	T extends ComponentType<infer P> ? P : never;

type PropsOf<T extends Tag> = HTMLPropsOf<T> | CustomComponentProps<T>;
export type Props<T extends Tag, U = object> = PropsOf<T> & OurProps<T> & U;
