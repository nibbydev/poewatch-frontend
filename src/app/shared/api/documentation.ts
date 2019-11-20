export class Documentation {
  id: string;
  url: string;
  description: string;
  reply?: DocumentationReply[];
  request?: DocumentationRequest[];
}

export class DocumentationReply {
  param: string;
  description: string;
  condition: string;
  dataType: string;
}

export class DocumentationRequest {
  param: string;
  description: string;
  required: boolean;
}
