export class ApiDoc {
  id: string;
  url: string;
  description: string;
  reply?: ApiDocReply[];
  request?: ApiDocRequest[];
}

export class ApiDocReply {
  param: string;
  description: string;
  condition: string;
  dataType: string;
}

export class ApiDocRequest {
  param: string;
  description: string;
  required: boolean;
}
