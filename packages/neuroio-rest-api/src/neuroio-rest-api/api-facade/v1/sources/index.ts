import { Result, Paginatable, Searchable, id } from "../../../../base/types";
import { License } from "./types";

export interface SourceInterface {
  // General
  id?: id;
  // read only
  space_id?: id;
  name?: string;
  license_type?: License;
  identify_facesize_threshold?: number;
  use_pps_timestamp?: boolean;

  // Photo processing
  manual_create_facesize_threshold?: number;
  manual_create_on_ha?: boolean;
  manual_create_on_junk?: boolean;
  manual_identify_asm?: boolean;

  // Processing a video stream
  auto_create_persons?: boolean;
  auto_create_facesize_threshold?: boolean;
  auto_create_check_blur?: boolean;
  auto_create_check_exposure?: boolean;
  auto_create_on_ha?: boolean;
  auto_create_on_junk?: boolean;
  auto_check_face_angle?: boolean;
  auto_check_angle_threshold?: number;
  auto_check_liveness?: boolean;
  auto_create_liveness_only?: boolean;
  auto_identify_asm?: boolean;

  // Saving images
  store_images_for_results?: Array<Result>;
}

export interface SourcesFiltersInterface extends Paginatable, Searchable {
  spaces_ids?: Array<id>;
}

export interface SourcesInterface {
  getSources(filters: SourcesFiltersInterface): Promise<null>;
  getSource(sourceId: id): Promise<SourceInterface>;
  createSource(source: SourceInterface): Promise<SourceInterface>;
  deleteSource(sourceId: id): Promise<null>;
}
