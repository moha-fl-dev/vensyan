import { TRPCClientError } from "@trpc/client";
import { AnyRouter, TRPCError } from "@trpc/server";
import { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";
import * as React from "react";
import { FieldValues, UseFormSetError } from "react-hook-form";
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
    error: TRPCError
}

type DispatchSchemaErrorParams<R extends AnyRouter, S extends FieldValues> = SchemaError<S> & SchemaErrorParams


export function dispatchServerError<R extends AnyRouter, S extends FieldValues>(params: DisspatchServerErrorParams<S>): void {

    const { setStateAction, error, zodSchemaError: { setError } } = params;

    if (isTrpcClientError<R>(error)) {
        const { data, message, meta, name, shape, stack, cause } = error as TRPCClientError<R>;


        if (data) {

            if (data.zodError) {

                return dispatchZodSchemaError<R, S>({ error: data, setError })
            }

            const { code } = data as TRPCError;

            const responseMessage = trpcErrorCodeToMessage[code];

            return code === "INTERNAL_SERVER_ERROR" ? setStateAction(() => responseMessage) : setStateAction(() => message);

        }

    }


    const { code, stack } = error as TRPCError;

    const responseMessage = trpcErrorCodeToMessage[code];

    return setStateAction(() => responseMessage);
}


function dispatchZodSchemaError<R extends AnyRouter, S extends FieldValues>(params: DispatchSchemaErrorParams<R, S>): void {

    // console.log(params)

    const { error, setError } = params

    const { stack, cause } = error;

    console.log(cause!.stack)

    // const zodErr = data!.zodError as ZodIssue[]

    // zodErr.forEach((err) => {

    //     const field = err.path[0] as FieldPath<S>

    //     return setError(field, {
    //         type: 'manual',
    //         message: err.message
    //     })
    // })
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