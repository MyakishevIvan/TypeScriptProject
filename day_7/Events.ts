type Entity = "user" | "product" | "order";
type Action = "created" | "updated" | "deleted";

type EventName = `${Entity}.${Action}`;

type EventHandlers = {
    [E in EventName]?: () => void;
};

interface EventPayloads {
    "user.created": {
        id: number;
        name: string;
    };

    "user.deleted": {
        id: number;
    };

    "product.created": {
        id: number;
        price: number;
    };
}

function emit<E extends keyof EventPayloads>(event: E, payload: EventPayloads[E]): void {
    console.log(event, payload);
}

emit<"user.created">("user.created", {id:2, name: "user"});

class TypedEventBus {
    private handlers: EventHandlers = {};


    emit<E extends EventPayloads>(event: E): void {
        this.handlers[event]?.();
    }
}


class EventBus {
    private handlers: EventHandlers = {};

    on<E extends EventName>(event: E, handler: () => void): void {
        this.handlers[event] = handler;
    }

    emit<E extends EventName>(event: E): void {
        this.handlers[event]?.();
    }
}
