import { FC, PropsWithChildren } from "react";

type RouterParams<P = {}, SP = {}> = {
  params: P;
  searchParams: SP;
};
export type FCC<P = {}> = FC<PropsWithChildren<P>>;
export type Page<P = {}, SP = {}> = FC<RouterParams<P, SP>>;
export type Layout<P = {}, SP = {}> = FCC<RouterParams<P, SP>>;
