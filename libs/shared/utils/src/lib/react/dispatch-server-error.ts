import { TRPCClientError } from "@trpc/client";
import { AnyRouter, TRPCError } from "@trpc/server";
import { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";
import * as React from "react";
import { FieldPath, FieldValues, UseFormSetError } from "react-hook-form";
import { ZodIssue } from "zod";
import { isTrpcClientError } from "../shared-utils";

type DisspatchServerErrorParams<S extends FieldValues> = {
    setStateAction: React.Dispatch<React.SetStateAction<string | null>>;
    error: unknown
    zodSchemaError: SchemaError<S>
}

type SchemaError<S extends FieldValues> = {
    setError: UseFormSetError<S>
}

type SchemaErrorParams = {
    issues: ZodIssue[]
}

type DispatchSchemaErrorParams<S extends FieldValues> = SchemaError<S> & SchemaErrorParams


export function dispatchServerError<R extends AnyRouter, S extends FieldValues>(params: DisspatchServerErrorParams<S>): void {

    const { setStateAction, error, zodSchemaError: { setError } } = params;

    if (isTrpcClientError<R>(error)) {

        const { data, message, meta, name, shape, stack, cause } = error as TRPCClientError<R>;


        if (data) {

            if (data.zodError) {
                const zodErr = data.zodError as ZodIssue[]

                return dispatchZodSchemaError<S>({ issues: zodErr, setError })
            }

            const { code } = data as TRPCError;

            const responseMessage = trpcErrorCodeToMessage[code];

            if (responseMessage === undefined) return setStateAction(() => "Oeps. something went wrong. Please try again later.");

            return code === "INTERNAL_SERVER_ERROR" ? setStateAction(() => responseMessage) : setStateAction(() => message);

        }

    }


    const { code } = error as TRPCError;

    const responseMessage = trpcErrorCodeToMessage[code];

    if (responseMessage === undefined) return setStateAction(() => "Oeps. something went wrong. Please try again later.");

    return setStateAction(() => responseMessage);
}


function dispatchZodSchemaError<S extends FieldValues>(params: DispatchSchemaErrorParams<S>): void {


    const { issues, setError } = params

    issues.reduce((acc: Partial<Record<keyof S, string>>, curr) => {

        const key = curr.path[0] as FieldPath<S>

        const message = acc[key] = curr.message


        setError(key, {
            type: "manual",
            message
        })

        return acc

    }, {})
}



const trpcErrorCodeToMessage: Record<TRPC_ERROR_CODE_KEY, string> = {
    PARSE_ERROR: "",
    BAD_REQUEST: "",
    INTERNAL_SERVER_ERROR: "Oeps. something went wrong. Please try again later.",
    UNAUTHORIZED: "",
    FORBIDDEN: "",
    NOT_FOUND: "oeps. Requested resource not found.",
    METHOD_NOT_SUPPORTED: "",
    TIMEOUT: "",
    CONFLICT: "",
    PRECONDITION_FAILED: "",
    PAYLOAD_TOO_LARGE: "",
    TOO_MANY_REQUESTS: "",
    CLIENT_CLOSED_REQUEST: "",
}