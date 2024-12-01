import { ComponentChildren, ComponentProps, ComponentType, JSX } from "preact";

export type Tag = keyof JSX.IntrinsicElements | ComponentType<any>;

type OurProps<T extends Tag> = {
	as?: T;
	children?: ComponentChildren;
};

type PropsOf<T extends Tag> = Omit<ComponentProps<T>, keyof OurProps<T>>;
export type Props<T extends Tag, U = object> = PropsOf<T> & OurProps<T> & U;
